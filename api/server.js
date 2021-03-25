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

server.get('/cars/:id', (req, res) => {
    Cars.getById(req.params.id)
    .then(car => {
        res.status(200).json(car);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong fetching a car' });
    })
});

server.post('/cars', (req, res) => {
    Cars.insert(req.body)
    .then(newCar => {
        res.status(200).json(newCar);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong when adding a car' });
    })
});

server.delete('/cars/:id', (req, res) => {
    Cars.remove(req.params.id)
    .then(removedCar => {
        res.status(200).json(removedCar);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong while removing a car' });
    })
});

module.exports = server;