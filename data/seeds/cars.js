exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {make: 'Ford', model: 'Mustang'},
        {make: 'Chevy', model: 'Corvette'},
        {make: 'Ferrari', model: '458 Italia'},
        {make: 'Jeep', model: 'Grand Cherokee'}
      ]);
    });
};
