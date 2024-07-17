const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
    if (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to read notes' });
    }
    res.json(JSON.parse(data));
});
});

app.post('/api/notes', (req, res) => {
const { title, text } = req.body;
if (!title || !text) {
    return res.status(400).json({ error: 'Title and text are required' });
}

const newNote = {
    id: uuidv4(),
    title,
    text,
};

fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
    if (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to read notes' });
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(
    path.join(__dirname, 'db/db.json'),
    JSON.stringify(notes, null, 2),
    (err) => {
        if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save note' });
        }
        res.json(newNote);
    }
    );
});
});

// Start the server
app.listen(PORT, () => {
console.log(`App listening on port ${PORT}`);
console.log(`http://localhost:${PORT}`);
});

