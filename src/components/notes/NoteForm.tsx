import React, { useState, useEffect } from 'react';
import * as service from '../../services/NoteService';
import '../../App.css';
import { Link } from 'react-router-dom';
import Note from '../../interfaces/Note';
import { Table, Button, Popover, PopoverHeader, PopoverBody, Spinner, Input } from 'reactstrap'

const NoteForm = () =>
{

        const [noteDescQuery, setNoteDescQuery] = useState('');
        const [noteIdQuery, setNoteIdQuery] = useState('');
        const [notes, setNotes] = useState([] as Note[]);
        const [isLoading, setIsLoading] = useState(false);
        const [popoverId, setPopoverId] = useState(-1)
        
        useEffect(() => {
            getNotes()
        }, [])
        
        const getNotes = async () => {
            setIsLoading(true)
            const notes = await service.get()
            setIsLoading(false)
            setNotes([...notes])
        }        
        
        const handleDelete = e => { 
            service.remove(popoverId).then(success => { if (success) { 
                                            setPopoverId(-1)
                                            getNotes()
                                             } else{ throw 'no way';}}).catch(err => console.log(err))
        }    
    
        const noteList = (

            notes.length > 0 &&
                    <Table striped bordered>
                        <thead>
                            {notes.length > 0 && <tr key={'listHead'}>{['Id', 'Subject', 'Description'].map(key => <th style={{fontWeight: 'bolder'}} key={key}><h4>{key}</h4></th>)}<td></td></tr>}
                        </thead>
                        <tbody>
                            {notes && 
                             notes.map(note => <tr key={`note_${note.id}`}>
                             {Object.entries(note)!
                             .filter(val => noteDescQuery && !noteIdQuery ? note.descrip.includes(noteDescQuery) : noteIdQuery && !noteDescQuery ? note.id === Number(noteIdQuery) : true)
                             .map(([key, value], index) => { return <>
                                <td key={`${value}`}>{ key === 'id' ? <Link to={`/note/${note.id}`} >{value}</Link> : value}</td>
                                { index + 1 === Object.keys(note).length &&
                                    <td style={{width: "15%"}}>
                                        <div style={{display: "inline", paddingRight:"5px"}}>
                                        <Link to={`/note/${note.id}`} >
                                            <Button>Edit</Button>
                                        </Link>
                                        </div>
                                        <div style={{display: "inline"}}>
                                        <Button id={`deleteBtn${note.id}`} onClick={() => setPopoverId(note.id)}>
                                            Delete
                                        </Button>
                                        <Popover placement="right" isOpen={popoverId === note.id} target={`deleteBtn${note.id}`}>
                                            <PopoverHeader>Sure about that?</PopoverHeader>
                                            <PopoverBody>
                                                <Button onClick={handleDelete}>I'm sure</Button>
                                                <Button onClick={() => setPopoverId(-1)}>Cancel</Button>
                                            </PopoverBody>
                                        </Popover>
                                        </div> 
                                    </td>
                                }
                                </>})}
                                </tr>)}
                        </tbody>
                    </Table>
        )

        const handleInput = (e) =>
        {
            switch(e.target.id)
            {
                case 'desc_query':
                    setNoteDescQuery(e.target.value)
                    break;
                case 'id_query':
                    setNoteIdQuery(e.target.value ? Number(e.target.value) : e.target.value)
                    break;
                default:
                    return;
            }
        }

        const handleKey = (e) => {

            if (isNaN(parseInt(e.key)) &&
                !['Enter',
                'Backspace',
                'Control',
                'Shift',
                'Tab',
                'Alt',
                'Home',
                'End',
                'Insert',
                'Delete',
                'F12'].includes(e.key)) e.preventDefault()
        }

        return (
            <>
                <div>
                    <div>
                        <div style={{paddingTop: '30px', paddingBottom: '30px', width: "20%"}}>
                            <label htmlFor='id_query'>Find Note by Id</label>
                            <Input id='id_query' value={noteIdQuery} onKeyDown={handleKey} onChange={handleInput} />
                        </div>
                    </div>
                    <div>
                        <div style={{paddingTop: '10px',paddingBottom: '30px', width: "50%"}}>
                            <label htmlFor='desc_query'>Find Notes by Description</label>
                            <Input type='text' id='desc_query' value={noteDescQuery} onChange={handleInput}/>
                        </div>
                    </div>
                </div >

                {isLoading ? <Spinner /> : notes.length ? noteList : <h4 style={{padding: "20px"}}>No notes yet!</h4>}
                
                <div>
                    <Link to={`/note/create`} >
                        <Button className='note-Button'>
                            New Note
                        </Button>
                    </Link>
                </div>
            </>
        )
    }

export default NoteForm