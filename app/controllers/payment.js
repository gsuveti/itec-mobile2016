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

router.post('/payment/:userId/:tableId', function (req, res, next) {
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
          return res.json({status: 'ok', ordersIds: ordersIds});
        })
        .catch(function (error) {
          return res.json(getError("productId is not valid"));
        });
    });
  }
  else {
    return res.json(getError("you have no products"));
  }
});


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
          return res.json({status: 'ok', ordersIds: ordersIds});
        })
        .catch(function (error) {
          return res.json(getError("productId is not valid"));
        });
    });
  }
  else {
    return res.json(getError("you have no products"));
  }
});


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
          return res.json({status: 'ok', ordersIds: ordersIds});
        })
        .catch(function (error) {
          return res.json(getError("productId is not valid"));
        });
    });
  }
  else {
    return res.json(getError("you have no products"));
  }
});

router.get('/deliver/:orderId/:quantity', function (req, res, next) {
  var orders = req.body;

  if (req.params.orderId && req.params.quantity) {
    db['comenzi_linii_livrat'].create(
      {
        operare: Date.now(),
        cantitate: req.params.quantity,
        comenzi_linii_id: req.params.orderId
      }
    ).then(function (deliveredOrder) {
        return res.json({status: 'ok', deliveredOrderId: deliveredOrder.tab_id});
      })
      .catch(function (error) {
        return res.json(getError('orderId not valid'));
      });
  }
  else {
    return res.json(getError("you must provide an orderId and the number of products"));
  }
});