
const clients = require('../seed-data/clients');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return process.env.NODE_ENV 
  ? knex.raw('TRUNCATE TABLE clients CASCADE')
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
