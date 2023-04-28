import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) => {
    const url = "http://localhost:8000/api/notes";
    const [notes, setNotes] = useState([]);

    // Get a note
    const getNotes = async () => {

        const response = await fetch(`${url}/fetchallnotes`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            },
        });

        const json = await response.json();
        setNotes(json);
    }

    // Adding a note
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${url}/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const note = await response.json();
        setNotes(notes.concat(note));

    }
    // Deleting a note
    const deleteNote = async (id) => {
        const response = await fetch(`${url}/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    // Editing a note
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${url}/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        // Logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

};


export default NoteState;