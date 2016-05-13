// Example model


module.exports = function (sequelize, DataTypes) {

  var NotePlata = sequelize.define('note_plata', {
    tab_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    locatii_id: DataTypes.INTEGER,
    valoare_tot: DataTypes.DECIMAL,
    operare: DataTypes.DATE,
    clienti_id: DataTypes.INTEGER,
    discount: DataTypes.DECIMAL
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return NotePlata;
};

