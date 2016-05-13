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

router.post('/user', function (req, res, next) {
  var userDetails = req.body;

  if (!userDetails.email) {
    return res.json(getError("no email"));
  }
  //FIXME encrypt password
  if (!userDetails.password) {
    return res.json(getError("no password"));
  }

  db['clienti'].findAll({
    where: {
      email: userDetails.email,
      parola: userDetails.password
    }
  }).then(function (users) {
    if (users && users[0]) {
      return res.json({status: 'ok', user_id: users[0]['tab_id']});
    } else {
      return res.json({status: 'not_found', message: 'email or password not ok'});
    }
  });
});
