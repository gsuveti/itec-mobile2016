// Example model


module.exports = function (sequelize, DataTypes) {

  var ComenziLinii = sequelize.define('comenzi_linii', {
    tab_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    comenzi_id: DataTypes.INTEGER,
    produse_id: DataTypes.INTEGER,
    cantitate: DataTypes.INTEGER,
    pret: DataTypes.INTEGER,
    preferinte: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return ComenziLinii;
};

