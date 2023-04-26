import React, { useEffect } from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const About = () => {
  const a = useContext(NoteContext);
  console.log(a);

  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  return (
    <div>
     {a.state.name} and he is in {a.state.class}

    </div>
  )
}

export default About
