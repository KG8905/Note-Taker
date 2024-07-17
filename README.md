# Note-Taker
Description
The Note Taker application is a simple and efficient tool that allows users to write, save, and delete notes. This application uses an Express.js back-end and saves and retrieves note data from a JSON file.

Table of Contents
Installation
Usage
API Routes
HTML Routes




Installation
To install and run this application locally, follow these steps:

Clone the repository to your local machine:


git clone https://github.com/yourusername/note-taker.git
Navigate to the project directory:



cd note-taker
Install the necessary dependencies:


npm install
Start the server:


npm start
Open your browser and go to:


http://localhost:3000


Usage
Click on "Get Started" to view and create notes.
Write a note title and the content of your note.
Click the save icon to save your note.
Click on an existing note to view it.
Click on the trash icon to delete a note.


API Routes
GET /api/notes
Reads the db.json file and returns all saved notes as JSON.
POST /api/notes
Receives a new note to save on the request body, adds it to the db.json file, and returns the new note to the client.
Each note is given a unique ID using the uuid package.


HTML Routes
GET /notes
Returns the notes.html file.
GET *
Returns the index.html file for all other routes.
