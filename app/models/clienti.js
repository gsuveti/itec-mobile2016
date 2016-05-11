// Example model


module.exports = function (sequelize, DataTypes) {

  var Clienti = sequelize.define('clienti', {
    tab_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nume: DataTypes.STRING,
    nick: DataTypes.STRING,
    email: DataTypes.STRING,
    parola: DataTypes.STRING,
    discount: DataTypes.DECIMAL,
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

  return Clienti;
};

