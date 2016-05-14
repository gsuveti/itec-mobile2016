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

router.post('/order/:userId/:tableId', function (req, res, next) {
  var orders = req.body;

  if (orders && orders.length > 0) {
    db['comenzi'].create(
      {
        operare: Date.now(),
        livrat: false,
        nfc: false,
        clienti_id: req.params.userId,
        locatii_id: req.params.tableId
      }
    ).then(function (savedOrder) {
      var ordersPromises = [];

      for (var order of orders) {
        if (!order.productId || !order.quantity) {
          return res.json(getError("you must enter a valid productId and the quantity"));
        }

        order.comenzi_id = savedOrder.tab_id;
        order.livrat = false;
        order.pret = 0;

        order.produse_id = order.productId;
        order.productId = undefined;

        order.cantitate = order.quantity;
        order.quantity = undefined;

        order.preferinte = order.observations;
        order.observations = undefined;

        ordersPromises.push(
          db['comenzi_linii'].create(
            order
          )
        );
      }
      Promise.all(ordersPromises)
        .then(function (orders) {
          var ordersIds = [];
          for (var order of orders) {
            ordersIds.push(order.tab_id);
          }
          return res.json({status: 'ok', orders_ids: ordersIds});
        })
        .catch(function (error) {
          return res.json(getError("productId is not valid"));
        });
    });
  }
  else {
    return res.json(getError("no orders"));
  }
});

router.get('/deliver/:orderId', function (req, res, next) {
  if (req.params.orderId) {
    db['comenzi_linii'].findAll({
        where: {
          tab_id: req.params.orderId
        }
      }
    ).then(function (order) {
        if (order && order[0]) {
          db['comenzi_linii_livrat'].create(
            {
              operare: Date.now(),
              cantitate: order[0].cantitate,
              comenzi_linii_id: req.params.orderId
            }
          ).then(function (deliveredOrder) {
              return res.json({status: 'ok', delivered_order_id: deliveredOrder.tab_id});
            })
            .catch(function (error) {
              console.log(error);
              return res.json(getError('orderId not valid'));
            });
        }
      })
      .catch(function (error) {
        console.log(error);
        return res.json(getError('orderId not valid'));
      });

  }
  else {
    return res.json(getError("you must provide a valid orderId"));
  }
});

router.get('/bill/:tableId', function (req, res, next) {
  if (req.params.tableId) {
    db.sequelize.query('SELECT' +
        ' comenzi_linii.produse_id as product_id, ' +
        ' comenzi_linii_livrat.tab_id as delivered_order_id, ' +
        ' produse.denumire product_name, ' +
        ' produse.pret unit_price, ' +
        ' comenzi_linii.cantitate as quantity, ' +
        ' comenzi_linii.cantitate * produse.pret as price, ' +
        ' clienti.nick, ' +
        ' clienti.email ' +
        ' FROM comenzi_linii_livrat ' +
        ' inner join comenzi_linii_neincasat on comenzi_linii_livrat.tab_id = comenzi_linii_neincasat.comenzi_linii_livrat_id' +
        ' inner join comenzi_linii on comenzi_linii_id = comenzi_linii.tab_id' +
        ' inner join comenzi on comenzi_id = comenzi.tab_id' +
        ' inner join clienti on clienti_id = clienti.tab_id' +
        ' inner join produse on produse_id = produse.tab_id' +
        ' where comenzi.locatii_id = ' + req.params.tableId
      )
      .then(function (projects) {
        res.json(projects[0]);
      })
  }
});


router.post('/table', function (req, res, next) {
  var where;
  var tableCode = req.body;
  if (tableCode) {
    where = {};
    if (tableCode.qr) {
      where.qr_code = tableCode.qr;
    }
    else if (tableCode.nfc) {
      where.nfc = tableCode.nfc;
    }
  }
  if (where) {
    db['locatii'].findAll({
        where: where
      })
      .then(function (locations) {
        res.json({status: 'ok', tableId: locations[0].tab_id});
      })
      .catch(function (error) {
        res.json({status: 'error', error: 'invalid qr or nfc'});
      });
  }
  else {
    return res.json(getError('no qr or nfc'))
  }

});

