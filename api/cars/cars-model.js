const db = require('../../data/db-config');

function getAll() {
    return db('cars')
  };
  
  function getById(id) {
    return db('cars').where({ id }).first();
  };
  
  async function insert(car) {
    const [id] = await db('cars').insert(car);
    return getById(id); // not necessary with postgres
  };
  
  async function update(id, changes) {
    return null
  };
  
  function remove(id) {
    return null
  };

  module.exports = {
      getAll,
      getById,
      insert,
      update,
      remove
  }