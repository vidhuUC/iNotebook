import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) => {
   const notesInitial = [
    {
        "_id": "613a9a7d2c2a7e1f0c9b4c7e",
        "user": "613a9a7d2c2a7e1f0c9b4c7d",
        "title": "My title",
        "description": "My description",
        "tag": "personal",
        "date": "2021-09-09T17:00:29.000Z",
        "__v": 0
    },
    {
        "_id": "613a9a7d2c2a7e1f0c9b4c7e",
        "user": "613a9a7d2c2a7e1f0c9b4c7d",
        "title": "My title",
        "description": "My description",
        "tag": "personal",
        "date": "2021-09-09T17:00:29.000Z",
        "__v": 0
    },
   ]
   const [notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

};


export default NoteState;