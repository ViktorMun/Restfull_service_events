'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Allevents', [
      { title: 'New year', startdate: '2018-01-01', enddate: '2018-01-01', description: 'Magic', createdAt: 'NOW()', updatedAt: 'NOW()'  },
      { title: 'Event2', startdate: '2018-01-01', enddate: '2018-01-01', description: 'event2', createdAt: 'NOW()', updatedAt: 'NOW()'  },
      { title: 'Event3', startdate: '2018-01-01', enddate: '2018-01-01', description: 'event3', createdAt: 'NOW()', updatedAt: 'NOW()'  }

    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Allevents', null, {});
  }
};
