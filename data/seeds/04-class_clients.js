
const class_clients = require('../seed-data/class-clients');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return process.env.NODE_ENV 
  ? knex.raw('TRUNCATE TABLE class_clients CASCADE')
  .then(function () {
    // Inserts seed entries
    return knex('class_clients').insert(class_clients);
  })
  : knex('class_clients').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('class_clients').insert(class_clients);
    });
};
