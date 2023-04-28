import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" })
    const ref = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote);
    }
    const handleClick = (e) => {
        editNote(note.id, note.title, note.description, note.tag);
        refClose.current.click();

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.id]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={note.title} minLength={5} required onChange={onChange
                                    } />
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" value={note.description} minLength={5} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label for="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" value={note.tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={ note.title.length<5 || note.description.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                {notes.length === 0 && 'No notes to display'}
                {notes.map((note) => {
                    return <NoteItem note={note} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes
