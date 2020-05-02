const db = require('../db');

const findAll = () => db('classes');

const findBy = filter => db('classes').where(filter);

const findById = id => db('classes').where({ id }).first();

const add = async classToRegister => {
    try {
        const [id] = await db('classes').insert(classToRegister, 'id');    
        return findById(id);
    } catch (error) {
        console.log(error);
    }
    
}

const remove = id => db('classes').where({ id }).del();

const update = async (id, changes) => {
    await db('classes').where({ id }).update(changes);
    return findById(id);
}

const registerClient = async (client_id, class_id) => {
    await db('class_clients').insert({ class_id, client_id });
    return findById(class_id);
}

const findClients = class_id => (
    db('class_clients').where({ class_id })
        .join('clients', 'clients.id', '=', 'class_clients.client_id')
        .select('client_id as id', 'username', 'first_name', 'last_name', 'email', 'phone')
);

const findInstructor = class_id => (   
    db('classes').where('classes.id', '=', class_id)
        .join('instructors as i', 'i.id', '=', 'classes.instructor_id')
        .select('i.id', 'i.username', 'i.first_name', 'i.last_name', 'i.email', 'i.phone')
        .first()
)

module.exports = {
    findAll,
    findBy,
    findById,
    add,
    remove,
    update,
    registerClient,
    findClients,
    findInstructor
}