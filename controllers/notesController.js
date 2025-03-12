const Note = require('../models/notesModel');

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.getNotes();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNote = async (req, res) => {
    try {
        const note = await Note.getNoteById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note non trouvée' });
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ message: 'Titre et contenu obligatoires' });

        const newNote = await Note.createNote(title, content);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.updateNote(req.params.id, title, content);
        if (!updatedNote) return res.status(404).json({ message: 'Note non trouvée' });

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        await Note.deleteNote(req.params.id);
        res.json({ message: 'Note supprimée' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};