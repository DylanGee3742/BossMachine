const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase } = require('./db');
const { isIdeaValid } = require('./functions');

const ideas = getAllFromDatabase('ideas');

// /api/ideas
apiRouter
.route('/')
.get((req, res) => {
    res.send(ideas);
})
.post((req, res) => {
    const idea = {
        id: ideas.length + 1,
        name: req.body.name,
        description: req.body.description,
        weeklyRevenue: req.body.weeklyRevenue,
        numWeeks: req.body.numWeeks
    }
    if (isIdeaValid(idea)) {
        ideas.push(idea);
        res.status(201).send('Created');
    } else {
        res.status(422).send('Not a valid entry');
    }
});

// /api/ideas/:ideasId

apiRouter.param("ideaId", (req, res, next, ideaId) => {
    const ideaIndex = ideas.findIndex(idea => idea.id === ideaId);
    if (ideaIndex !== -1) {
    req.ideaIndex = ideaIndex;
    req.idea = ideas[ideaIndex];
    next();
    } else {
        res.status(404).send('Not Found');
    }
});

apiRouter
.route('/:ideaId')
.get((req, res) => {
    res.send(req.idea)
})
.put((req, res) => {
    ideas[req.ideaIndex] = req.body;
    res.send(ideas[req.ideaIndex])
})
.delete((req, res) => {
    ideas.splice(req.ideaIndex, 1)
    res.status(204).send()
});

module.exports = apiRouter;