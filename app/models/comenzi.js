// Example model


module.exports = function (sequelize, DataTypes) {

  var Comenzi = sequelize.define('comenzi', {
    tab_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    locatii_id: DataTypes.INTEGER,
    operare: DataTypes.DATE,
    clienti_id: DataTypes.INTEGER,
    livrat: DataTypes.BOOLEAN,
    nfc: DataTypes.BOOLEAN,
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return Comenzi;
};

