'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Allevents', [
      { title: 'New year', startdate: '2018-01-01', enddate: '2018-01-01', description: 'Magic', createdAt: 'NOW()', updatedAt: 'NOW()'  }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Allevents', null, {});
  }
};
