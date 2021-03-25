const express = require('express');

const Cars = require('./cars/cars-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ message: 'Working!' });
});

server.get('/cars', (req, res) => {
    Cars.getAll()
    .then(cars => {
        res.status(200).json(cars);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong fetching all of the cars' });
    })
});

module.exports = server;