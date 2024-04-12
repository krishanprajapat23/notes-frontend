import React from 'react'

const Note = ({note, toggleImportance}) => {

  const btnLabel = note.important ? 'Not Important' : 'Important';

  return (
    <>
       <li className='note'>
        {note.content} 
        <button onClick={toggleImportance}>{btnLabel}</button>
       </li> 
    </>
  )
}

export default Note