
exports.up = function(knex) {
    return knex.schema.table('classes', tbl => {
        tbl.string('image_url');
    });
};

exports.down = function(knex) {
    return knex.schema.table('classes', tbl => {
        tbl.dropColumn('image_url');
    });
};
