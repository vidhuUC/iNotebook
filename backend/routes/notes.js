const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
})

// Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchUser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, tag } = req.body;

            const note = new Notes({
                title, description, tag, user: req.user.id
            });
            const saveNote = await note.save();
            res.json(saveNote);
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
        }

    })

// Route 3: Update an existing note using: PUT "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ success: false, message: "Not Found" })
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: "Not Allowed" })
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
});

// Route 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ success: false, message: "Not Found" })
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: "Not Allowed" })
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Note has been deleted", note: note });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
});


module.exports = router;