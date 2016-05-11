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


  db['comenzi'].create(
    {
      operare: Date.now(),
      livrat: false,
      nfc: false,
      clienti_id: req.params.userId,
      locatii_id: req.params.tableId,
    }
  ).then(function (order) {
    return res.json(order);
  });
});
