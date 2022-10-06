const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase } = require('./db');
const { createMeeting } = require('./db');

const meetings = getAllFromDatabase('meetings');

apiRouter
.route('/')
.get((req, res) => {
    res.send(meetings)
})
.post((req, res) => {
    const newMeeting = createMeeting()
    meetings.push(newMeeting);
    res.status(201).send(newMeeting)
})
.delete((req, res) => {
    meetings.splice(0, meetings.length + 1)
    res.status(204).send()
})

module.exports = apiRouter;