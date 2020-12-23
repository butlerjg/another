
import Note from '../interfaces/Note'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
 
class NoteRepository  {
    
    private readonly db;
    constructor () {
       this.db = lowdb(new FileSync('db.json'));
    }

    getNewId = async():Promise<number> => {
         try {
            const size = await this.db.get('notes').size().value();
            let newId: number = 0;
            
            if (size > 0) {
               const ids = await this.db.get('notes').map('id').sortBy('id').value();
               const maxId = ids[size-1];

               newId = maxId;
            }

            return newId + 1
         }
         catch(err)
         {
            console.log(err)
            return Promise.reject()
         }
    }

    getById = async(id: number):Promise<Note> => {
         try {
            const note = await this.db.get('notes').find({ id: Number(id)}).value() as Note
            return note;
         }
         catch(err)
         {
            console.log(err)
            return Promise.reject()
         }

    }        
    query = async(query: string):Promise<Note[]> =>  {
         try {
            const notes = await this.db.get('notes').find({ descrip: query}).value() as Note[]
            return notes;
         }
         catch(err)
         {
            console.log(err)
            return Promise.reject()
         }
    }
    get = async():Promise<Note[]> => {
         try {
            const notes = await this.db.get('notes').value() as Note[]
            return notes;
         }
         catch(err)
         {
            console.log(err)
            return Promise.reject()
         }
   }
   update = async(note: Note):Promise<Note> => {        
         try {
            const currentNote = await this.db.get('notes')
            .find({id: note.id}).value()

            const updatedNote = await this.db.get('notes')
                                       .find({id: note.id}).assign({...note})
                                       .write()

            return updatedNote;
         }
         catch(err)
         {
            console.log(err)
            return Promise.reject()
         }
   }
   create = async(note: Note):Promise<Note> => {
         try {
            const newId = await this.getNewId();
            let newNote = { ...note};
            newNote.id = newId
            
            this.db.get('notes').push({ ...newNote}).write()
            
            return this.getById(newNote.id);
         }
         catch(err)
         {
            console.log(err)
            return Promise.reject()
         }
   }
   delete = async(id: number): Promise<boolean> => {
         try { 
            const response = await this.db.get('notes')
               .remove({ id: Number(id) })
               .write()
               
               return true;
         }
         catch(err)
         {
            console.log(err)
            return false;
         }
   }
  
}

export default NoteRepository