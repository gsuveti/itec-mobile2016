// Example model


module.exports = function (sequelize, DataTypes) {

  var ComenziLiniiNeincasat = sequelize.define('comenzi_linii_neincasat', {
    tab_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    comenzi_linii_livrat_id: DataTypes.INTEGER,
    cantitate: DataTypes.INTEGER,
    operare: DataTypes.DATE,
    locatii_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return ComenziLiniiNeincasat;
};

