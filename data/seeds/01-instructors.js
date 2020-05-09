
const instructors = require('../seed-data/instructors');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return process.env.NODE_ENV !== 'testing'
  ? knex.raw('TRUNCATE TABLE instructors RESTART IDENTITY CASCADE')
  .then(function () {
    // Inserts seed entries
    return knex('instructors').insert(instructors);
  })
  : knex('instructors').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('instructors').insert(instructors);
    });
};
