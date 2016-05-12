// Example model


module.exports = function (sequelize, DataTypes) {

  var ComenziLiniiLivrat = sequelize.define('comenzi_linii_livrat', {
    tab_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    comenzi_id: DataTypes.INTEGER,
    cantitate: DataTypes.INTEGER,
    operare: DataTypes.DATE
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return ComenziLiniiLivrat;
};

