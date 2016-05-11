// Example model


module.exports = function (sequelize, DataTypes) {

  var Produse = sequelize.define('produse', {
    tab_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    clasificari_id: DataTypes.INTEGER,
    um_id: DataTypes.STRING,
    imagini_id: DataTypes.INTEGER,
    pret: DataTypes.STRING,
    denumire: DataTypes.STRING,
    activ: DataTypes.BOOLEAN,
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return Produse;
};

