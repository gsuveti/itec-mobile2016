// Example model


module.exports = function (sequelize, DataTypes) {

  var NotaPlataLinii = sequelize.define('nota_plata_linii', {
    tab_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nota_plata_id: DataTypes.INTEGER,
    comanda_liv_id: DataTypes.INTEGER,
    valoare_tot: DataTypes.DECIMAL,
    canntitate: DataTypes.DECIMAL
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return NotaPlataLinii;
};

