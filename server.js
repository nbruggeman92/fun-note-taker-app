// imports
const express = require("express");
const path = require("path");
const store = require("./db/store");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET request
app.get("/api/notes", (req, res) => {
    store.getNotes().then((notes) => {
        return res.status(200).json(notes)
    }).catch((error) => res.status(500).json(error))   
})
// POST request
app.post("/api/notes", (req, res) => {
    store.addNotes(req.body).then((note) => {
        return res.status(200).json(note)
    }).catch((error) => res.status(500).json(error))
})
// DELETE request
app.delete("/api/notes/:id", (req, res) => {
    store.removeNotes(req.params.id).then(() => {
        return res.status(200).json({ delete : true, id: req.params.id})
    }).catch((error) => res.status(500).json(error))
})
// GET /notes returns notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})
// GET * returns index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})
// starting server at specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})