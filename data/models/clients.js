const db = require('../db');

const findAll = () => db('clients');

const findBy = filter => db('clients').where(filter);

const findById = id => db('clients').where({ id }).first();

const add = async client => {
    const [id] = await db('clients').insert(client, 'id');
    return findById(id);
}

const remove = id => db('clients').where({ id }).del();

const update = async (id, changes) => {
    await db('clients').where({ id }).update(changes, 'id');
    return findById(id);
}

const findClasses = client_id => (
    db('class_clients').where({ client_id })
        .join('classes', 'classes.id', '=', 'class_clients.class_id')
        .select('classes.*')
);

const findClassById = (client_id, class_id) => (
    db('class_clients').where({ client_id, class_id })
        .join('classes', 'classes.id', '=', 'class_clients.class_id')
        .select('classes.*')
        .first()
)

const removeClass = (client_id, class_id) => (
    db('class_clients').where({ client_id, class_id }).del()
)

module.exports = {
    findAll,
    findBy,
    findById,
    add,
    remove,
    update,
    findClasses,
    findClassById,
    removeClass
}