import React from 'react'
import { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';
import TagIcon from '@mui/icons-material/Tag';
import './Addnote.css'

const Addnote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setnote] = useState({ title: "", description: "", tag: "" })

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" });
    props.showAlert("Added successfully", "success");
  }
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div className=" d-flex justify-content-center align-items-center  mt-4 ">
      <div className="container my-4"  >
        <form className=" box my-3">
        <h2>Add a note</h2>
          <div className=" my-3 ">
            <label htmlFor="title" className="title" style={{fontSize: "20px"}}>Title</label>
            <textarea type="text" className="form-control" id="title" name="title" rows="1" value={note.title} onChange={onChange} minLength={5} required />
            <TitleIcon className="Icon1"/>

          </div>
          <div className="mb-3">
            <label htmlFor="description" className="description" style={{fontSize: "20px"}}>Description</label>
            <textarea type="text" className="form-control" id="description" name="description" rows="3" value={note.description} onChange={onChange} minLength={5} required />
            <DescriptionIcon className="Icon2"/>
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="tag" style={{fontSize: "20px"}}>Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
            <TagIcon className="Icon3"/>
          </div>

          <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>

    </div>
  )
}

export default Addnote
