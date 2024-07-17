const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const dbPath = path.join(__dirname, '../db/db.json');

// GET /api/notes - Read the db.json file and return all saved notes as JSON
router.get('/notes', (req, res) => {
fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to read notes' });
    }
    res.json(JSON.parse(data));
});
});

// POST /api/notes - Receive a new note, add it to the db.json file, and return the new note to the client
router.post('/notes', (req, res) => {
const { title, text } = req.body;
if (!title || !text) {
    return res.status(400).json({ error: 'Note must have a title and text' });
}

const newNote = {
    id: uuidv4(),
    title,
    text,
};

fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to read notes' });
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save note' });
    }
    res.json(newNote);
    });
});
});

module.exports = router;
