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

router.get('/categories', function (req, res, next) {
  db['clasificari'].findAll({
    attributes: [['tab_id', 'id'],['denumire', 'description'],['imagini_id','image_src_id']]
  }).then(function (categories) {
    return res.json({status: 'ok', categories: categories});
  });
});


