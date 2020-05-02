const db = require('../db');

const findAll = () => db('instructors');

const findBy = filter => db('instructors').where(filter);

const findById = id => db('instructors').where({ id }).first();

const add = async client => {
    const [id] = await db('instructors').insert(client, 'id');
    return findById(id);
}

const remove = id => db('instructors').where({ id }).del();

const update = async (id, changes) => {
    await db('instructors').where({ id }).update(changes, 'id');
    return findById(id);
}

const findClasses = instructor_id => db('classes').where({ instructor_id });

const addStripeAccountId = (instructor_id, stripe_account_id) => (
    db('instructors').where({id: instructor_id}).update({stripe_account_id}, '*')
)

module.exports = {
    findAll,
    findBy,
    findById,
    add,
    remove,
    update,
    findClasses,
    addStripeAccountId
}