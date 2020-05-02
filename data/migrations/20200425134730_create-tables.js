
exports.up = function(knex) {
    return knex.schema.createTable('instructors', tbl => {
        tbl.increments();
        tbl.string('username').notNullable().unique();
        tbl.string('password').notNullable();
        tbl.string('first_name').notNullable();
        tbl.string('last_name').notNullable();
        tbl.string('email').notNullable().unique();
        tbl.string('phone');
    })
    .createTable('clients', tbl => {
        tbl.increments();
        tbl.string('username').notNullable().unique();
        tbl.string('password').notNullable();
        tbl.string('first_name').notNullable();
        tbl.string('last_name').notNullable();
        tbl.string('email').notNullable().unique();
        tbl.string('phone');
    })
    .createTable('classes', tbl => {
        tbl.increments();
        tbl.integer('instructor_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('instructors')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.string('name').notNullable();
        tbl.string('type').notNullable();
        tbl.datetime('start_time').notNullable();
        tbl.string('location').notNullable();
        tbl.enu('intensity', [1,2,3,4,5]).notNullable();
        tbl.enu('status', ['CONFIRMED', 'CANCELED'])
            .notNullable()
            .defaultTo('CONFIRMED');
        tbl.decimal('price').notNullable();
        tbl.text('description');
        tbl.integer('duration');
        tbl.integer('max_class_size');
        tbl.unique(['id','instructor_id']);
    })
    .createTable('class_clients', tbl => {
        tbl.increments();
        tbl.integer('class_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.integer('client_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('clients')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.enu('status', ['CONFIRMED', 'CANCELED'])
            .notNullable()
            .defaultTo('CONFIRMED');
        tbl.unique(['class_id','client_id']);
    });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('class_clients')
        .dropTableIfExists('classes')
        .dropTableIfExists('clients')
        .dropTableIfExists('instructors');
};
