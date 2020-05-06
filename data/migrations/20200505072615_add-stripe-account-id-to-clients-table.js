
exports.up = function(knex) {
    return knex.schema.table('clients', tbl => {
        tbl.string('stripe_account_id');
    });
};

exports.down = function(knex) {
    return knex.schema.table('clients', tbl => {
        tbl.dropColumn('stripe_account_id');
    });
};
