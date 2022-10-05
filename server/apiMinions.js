const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase } = require('./db');
const { isMinionValid } = require('./functions');

const minions = getAllFromDatabase('minions')

// /api/minions
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

// /api/minions/:minionId

apiRouter.param("minionId", (req, res, next, minionId) => {
    const minionIndex = minions.findIndex(minion => minion.id === minionId)
    if (minionIndex !== -1) {
    req.minionIndex = minionIndex
    req.minion = minions[minionIndex]
    console.log(req.minion)
    next();
    } else {
        res.status(404).send('Not Found')
    }
});

apiRouter
.route('/minions/:minionId')
.get((req, res) => {
    res.send(req.minion)
})
.put((req, res) => {
    minions[req.minionIndex] = req.body
    res.send(minions[req.minionIndex])
})
.delete((req, res) => {
    minions.splice(req.minionIndex, 1);
    res.status(204).send();
})


module.exports = apiRouter;