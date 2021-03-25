const db = require('../../data/db-config');

function getAll() {
    return db('cars')
  };
  
  function getById(id) {
    return db('cars').where({ id }).first();
  };
  
  async function insert(car) {
    const [id] = await db('cars').insert(car);
    return getById(id);
  };
  
  async function update(id, changes) {
    return null
  };
  
  async function remove(id) {
    const data = await db('cars').where({ id }).delete();
    return data; // output will be 1 if success, 0 if fail
  };

  module.exports = {
      getAll,
      getById,
      insert,
      update,
      remove
  }