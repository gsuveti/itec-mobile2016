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

router.get('/products/:category_id', function (req, res, next) {
  db['produse'].findAll({
    where:{
      clasificari_id: req.params.category_id
    },
    attributes: [['tab_id', 'id'],['denumire', 'description'],['imagini_id','image_src_id'],['clasificari_id','category_id'],['pret','price']]
  }).then(function (produse) {
    return res.json({status: 'ok', produse: produse});
  });
});


router.get('/products', function (req, res, next) {
  db['produse'].findAll({
    attributes: [['tab_id', 'id'],['denumire', 'description'],['imagini_id','image_src_id'],['clasificari_id','category_id'],['pret','price']]
  }).then(function (produse) {
    return res.json({status: 'ok', produse: produse});
  });
});


