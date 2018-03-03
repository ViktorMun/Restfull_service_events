'use strict';
module.exports = (sequelize, DataTypes) => {
  var Allevents = sequelize.define('Allevents', {
    title: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    description: DataTypes.STRING,

    }, {});
  Allevents.associate = function(models) {
    // associations can be defined here
  };
  return Allevents;
};
