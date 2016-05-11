// Example model


module.exports = function (sequelize, DataTypes) {

  var Clasificari = sequelize.define('clasificari', {
    tab_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    parent_id: DataTypes.INTEGER,
    imagini_id: DataTypes.INTEGER,
    denumire: DataTypes.STRING,
    nr_ordine: DataTypes.INTEGER,
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

  return Clasificari;
};

