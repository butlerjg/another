import React, { useState, useEffect } from 'react';
import * as service from '../../services/NoteService';
import { useParams, Link } from 'react-router-dom'
import { Button, Input, Spinner } from 'reactstrap'
import Note from '../../interfaces/Note';

const inputStyle = {
   paddingTop: "15px",
   paddingBottom: "15px"
}

const EditNote = () => {

    const { id } = useParams();
    const [note, setNote] = useState({} as Note);
    const [isLoading, setIsLoading] = useState(false);
    const [noteDesc, setNoteDesc] = useState('');
    const [noteSubj, setNoteSubj] = useState('');
        
    useEffect(() => {
        setIsLoading(true)
        if (!isNaN(id))
        {
            service.getById(id).then(note => { 
                                                setNote(note as Note);  
                                                setNoteDesc(note.id ? note.descrip : '');
                                                setNoteSubj(note.id ? note.subject : '');
                                                setIsLoading(false)
                                             }).catch(err => console.log(err))
        }
        setIsLoading(false)
    }, []);

    const handleInput = e => {
        switch(e.target.id)
        {
            case 'noteDesc':
                setNoteDesc(e.target.value);
                break;
            case 'noteSubj':
                setNoteSubj(e.target.value);
            break;
            default: return
        }
    }
    
    const postOrPut = async(newNote:Note) => {
            return newNote.id > 0 ? await service.put(newNote) : await service.post(newNote);
    } 

    const handleSave = async(e) =>
    {
        setIsLoading(true)
        const newNote = {id: (note.id || -1), subject: noteSubj, descrip: noteDesc} as Note;

        try{

            const savedNote = await postOrPut(newNote);
            setNote({...savedNote});
            setIsLoading(false)
        }
        catch 
        {
            setIsLoading(false)
            alert("Something went wrong during save");
            return;
        }
    }

    return (
    
    isLoading ? <Spinner/> : <div style={{paddingTop: "30px"}}>
        <h2>{`What to know about ${note.id ? `note ${note.id}` : 'this note'}`}</h2>
        <div style={{width: "50%", ...inputStyle}}>
            <label style={{paddingRight: "8px"}} htmlFor='noteSubj'>Subject:</label>
            <Input type='text' id='noteSubj' value={noteSubj} onChange={handleInput}></Input>
        </div>
        <div style={{width: "70%", ...inputStyle}}>

            <label style={{}} htmlFor='noteDesc'>Description:</label>
            <div>
            <Input type="textarea" id="noteDesc" value={noteDesc} onChange={handleInput} rows={5}></Input>
            </div>
        </div>
        <div style={inputStyle}>
            <div style={{display: "inline", paddingRight:"5px"}}>
                <Link to={`/`} >
                    <Button>Cancel</Button>
                </Link>
            </div>
            <div style={{display: "inline"}}>
                <Button className='note-Button' onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div>
    </div>
    )


}

export default EditNote