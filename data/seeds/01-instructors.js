
const instructors = require('../seed-data/instructors');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return process.env.NODE_ENV 
  ? knex.raw('TRUNCATE TABLE instructors CASCADE')
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
