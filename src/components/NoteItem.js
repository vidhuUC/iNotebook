import React from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useContext } from 'react';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="card col-md-3 m-3" >
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <p className="card-text">{note.tag}</p>
                <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }}></i>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {
                    updateNote({ id: note._id, title: note.title, description: note.description, tag: note.tag });
                }}>

                </i>
            </div>
        </div >
    )
}

export default NoteItem
