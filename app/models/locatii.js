// Example model


module.exports = function (sequelize, DataTypes) {

  var Locatii = sequelize.define('locatii', {
    tab_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    parent_id: DataTypes.INTEGER,
    pozitie_x: DataTypes.DECIMAL,
    pozitie_y: DataTypes.DECIMAL,
    dimensiune_x: DataTypes.DECIMAL,
    dimensiune_y: DataTypes.DECIMAL,
    denumire: DataTypes.STRING,
    qr_code: DataTypes.STRING,
    nfc: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return Locatii;
};

