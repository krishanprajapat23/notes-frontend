import React, { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Note from './components/Note';
import Notification from './components/Notification';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)
  // console.log(notes);


  // useeffect

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })

  }, [])


  //  ======================================================================================
  
  const notesToShow = showAll ? notes : notes.filter(note=>note.important===true);

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`);
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find(note => note.id === id);
    const updatedNote = {...note, important : !note.important};

    noteService
    .update(id, updatedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error =>{
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(note => note.id !== id))
    })

  }

  const handleNoteChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }
  
  const handleAddNote = (e)=>{
    e.preventDefault();
    const noteObj = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1
    }
    noteService
    .create(noteObj)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
    
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button type="button" onClick={()=>setShowAll(!showAll)}>
        Show {showAll ? 'Important' : 'All'}
      </button>
      <ul>
        {notesToShow.map(note => {
          return <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        }
        )}
      </ul>
      <form onSubmit={handleAddNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>   

    </div>
  )
}


export default App;