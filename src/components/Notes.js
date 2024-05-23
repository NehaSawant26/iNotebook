import React from 'react'
import { useContext, useEffect, useState} from 'react'
import NoteContext from '../context/NoteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';
import TagIcon from '@mui/icons-material/Tag';
import './Notes.css';

const Notes = (props) => {
  const context = useContext(NoteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(()=>{
    if(localStorage.getItem('token')){
           getNotes()
    }
    else{
      navigate("/login")
    }
  })

  const [note,setnote]= useState({id:"", etitle:"", edescription:"", etag:""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});  
  }

 const ref = useRef(null)
 const refClose = useRef(null)

 const handleClick =()=>{
  editNote(note.id, note.etitle, note.edescription, note.etag)
  refClose.current.click();
  props.showAlert("Updated successfully", "success");
     
}
const onChange =(e)=>{
   setnote({...note, [e.target.name]: e.target.value})
}

  return (
    <>
      <Addnote showAlert={props.showAlert} />

      <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
            <form className="my-2">
          <div className="mb-3 ">
            <label htmlFor="title" className="title">Title</label>
            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required/>
            <TitleIcon className="icon1"/>
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="description">Description</label>
            <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
            <DescriptionIcon className="icon2"/>
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="tag">Tag</label>
            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
            <TagIcon className="icon3"/>
          </div>
          
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5 }  onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3"   >

        <h2>Your note</h2>
        <div className="container mx-2">
        {notes.length ===0 && 'No notes to display'}
        </div>

        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}  />
        })}
      </div>
    </>


  )
}

export default Notes
