// Example model


module.exports = function (sequelize, DataTypes) {

  var Locatii = sequelize.define('locatii', {
    tab_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    denumire: DataTypes.STRING,
    qr_code: DataTypes.STRING,
    nfc: DataTypes.STRING,
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

