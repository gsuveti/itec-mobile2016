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
    return res.json(orders);
  }
  else {
    return res.json(getError("you have no products"));
  }
});
