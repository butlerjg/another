import NoteRepository from '../models/NoteRepository';
import Note from '../interfaces/Note'

class NoteService  { 
  
  private readonly repo;
  
  constructor ()
  {
    this.repo = new NoteRepository();
  }

  getById = async(id: number): Promise<Note> => this.repo.getById(id);
  query = async(query: string): Promise<Note[]> => this.repo.query(query);
  get = async(): Promise<Note[]> => this.repo.get();
  save = async(note: Note): Promise<Note> => note.id > 0 ? this.repo.update(note) : this.repo.create(note)
  delete = async(id: number): Promise<boolean> => this.repo.delete(id);
}

export default NoteService;