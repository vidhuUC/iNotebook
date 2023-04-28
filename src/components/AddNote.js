import React, { useContext,useState } from 'react'
import NoteContext from '../context/notes/NoteContext';


const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e) => {
        e.preventDefault();
        addNote (note.title, note.description, note.tag);
        setNote ({title: "", description: "", tag: ""})
    }
    const onChange = (e) => {
        setNote({...note, [e.target.id]: e.target.value})
    }
    return (
        <div className='container my-3'>
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" minLength={5} required  value = {note.title} onChange={onChange
                    } />
                </div>
                <div className="mb-3">
                    <label for="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description"  minLength={5} required onChange={onChange} value = {note.description}/>
                </div>
                <div className="mb-3">
                    <label for="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag"  onChange={onChange} value={note.tag}/>
                </div>
                <button disabled={ note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick = {handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
