import React from 'react'
import NoteContext from '../context/NoteContext';
import { useContext } from 'react'

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {  deleteNote } = context;
    const {note, updateNote} = props ;
    
  return (
    <div className="col-md-3">   
    <div className="card my-3" >
  <div className="card-body ">
    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-trash-can mx-3 my-1" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully", "success");}} style={{fontSize : "18px"}}></i>
    <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note); }} style={{fontSize : "18px"}}></i>
    </div>
    <p className="card-text">{note.description}</p>
  </div>
</div>
    </div>
  )
}

export default NoteItem
