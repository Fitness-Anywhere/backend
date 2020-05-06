
exports.up = function(knex) {
    return knex.schema.table('class_clients', tbl => {
        tbl.string('stripe_payment_id');
    });
};

exports.down = function(knex) {
    return knex.schema.table('class_clients', tbl => {
        tbl.dropColumn('stripe_payment_id');
    });
};
