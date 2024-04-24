const express = require("express");
const store = require("./db/store");
// possibly move this ^

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/notes", (req, res) => {
    store.getNotes().then((notes) => {
        return res.status(200).json(notes)
    }).catch((error) => res.status(500).json(error))
    
})

app.post("/api/notes", (req, res) => {
    store.addNotes(req.body).then((note) => {
        return res.status(200).json(note)
    }).catch((error) => res.status(500).json(error))
})

app.delete("/api/notes/:id", (req, res) => {
    store.removeNotes(req.params.id).then(() => {
        return res.status(200).json({ delete : true, id: req.params.id})
    }).catch((error) => res.status(500).json(error))
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})