const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase } = require('../server/db');
const { isMinionValid } = require('./functions');

const minions = getAllFromDatabase('minions')


apiRouter
.route('/minions')
.get((req, res) => {
    res.send(minions)
})
.post((req, res) => {
    const minion = {
        id: minions.length + 1,
        name: req.body.name,
        title: req.body.title,
        weaknesses: req.body.weaknesses,
        salary: req.body.salary,
    }
    if (isMinionValid(minion)) {
        minions.push(minion);
        res.status(201).send('Created')
    } else {
        res.status(422).send('Not a valid entry')
    }
})

module.exports = apiRouter;
