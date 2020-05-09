
const classes = require('../seed-data/classes');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return process.env.NODE_ENV !== 'testing'
  ? knex.raw('TRUNCATE TABLE classes RESTART IDENTITY CASCADE')
  .then(function () {
    // Inserts seed entries
    return knex('classes').insert(classes);
  })
  : knex('classes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert(classes);
    });
};
