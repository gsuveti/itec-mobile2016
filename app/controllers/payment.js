var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

function getError(message) {
  return {
    status: "error",
    message: message
  }
}

router.post('/pay/:userId/:tableId', function (req, res, next) {
  var payments = req.body;

  if (payments && payments.length > 0) {
    var paymentsIds = [];
    var paymentsMap = {};
    for (var payment of payments) {
      if (!payment.delivered_order_id) {
        return res.json(getError('no delivered_order_id'));
      }
      paymentsIds.push(payment.delivered_order_id);
      paymentsMap[payment.delivered_order_id] = payment.quantity;
    }

    db['comenzi_linii_neincasat'].findAll({
      where: {
        comenzi_linii_livrat_id: {in: paymentsIds}
      },
      attributes: ['comenzi_linii_livrat_id', 'cantitate']
    }).then(function (cln) {
      if(cln.length <= 0){
        return res.json(getError('the bill has changed. refresh the bill!'));
      }

      for (var c of cln) {
        if (paymentsMap[c.comenzi_linii_livrat_id] > c.cantitate) {
          return res.json(getError('the bill has changed or the quantity is greater than the unpaid items'));
        }
        if (!paymentsMap[c.comenzi_linii_livrat_id] || paymentsMap[c.comenzi_linii_livrat_id] <= 0) {
          return res.json(getError('the quantity should be greater than 0'));
        }
      }


      db['note_plata'].create(
        {
          locatii_id: req.params.tableId,
          valoare_tot: 0,
          operare: Date.now(),
          clienti_id: req.params.userId,
          discount: 0
        }
      ).then(function (savedBill) {
        var paymentsPromises = [];
        for (var payment of payments) {
          paymentsPromises.push(
            db['note_plata_linii'].create(
              {
                note_plata_id: savedBill.tab_id,
                comanda_liv_id: payment.delivered_order_id,
                cantitate: payment.quantity
              }
            )
          );
        }

        paymentsPromises.push(
          db['note_plata_incasate'].create(
            {
              note_plata_id: savedBill.tab_id,
              operare: Date.now(),
              utilizator_id: req.params.userId
            }
          )
        );

        Promise.all(paymentsPromises)
          .then(savedPayments => {
            return res.json({status: 'ok'});
          })
      });
    });


  }
  else {
    return res.json(getError("you have no products"));
  }
});
