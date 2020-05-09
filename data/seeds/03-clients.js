
const clients = require('../seed-data/clients');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return process.env.NODE_ENV !== 'testing'
  ? knex.raw('TRUNCATE TABLE clients RESTART IDENTITY CASCADE')
  .then(function () {
    // Inserts seed entries
    return knex('clients').insert(clients);
  })
  : knex('clients').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert(clients);
    });
};
