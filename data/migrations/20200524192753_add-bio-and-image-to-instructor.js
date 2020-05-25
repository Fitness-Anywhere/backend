
exports.up = function(knex) {
    return knex.schema.table('instructors', tbl => {
        tbl.text('bio');
        tbl.string('image_url');
    });
};

exports.down = function(knex) {
    return knex.schema.table('instructors', tbl => {
        tbl.dropColumn('bio');
        tbl.dropColumn('image_url');
    });
};
