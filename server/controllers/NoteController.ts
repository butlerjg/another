import expressRouter from 'express';
import NoteService from '../services/NoteService';
import Note from '../interfaces/Note'

class NoteController {
  
  private NoteRouter: any
  private readonly service = new NoteService();

  constructor ()
  {
    this.NoteRouter = expressRouter();
    this.setRoutes();
  }

  routes = () => this.NoteRouter;

  setRoutes() {
        this.NoteRouter.get('/', async(req, res, next) => {

          if (!res.headersSent) res.setHeader('Content-Type', 'application/json');
          
          if (Object.keys(req.query).length > 0) return next()

          this.service.get().then(notes => res.send(notes as Note[])).catch(err => next(err))

        },async(req, res, next) => {
            
              if (!req.query.id) return next()

              this.service.getById(req.query.id).then(note => res.send(note as Note)).catch(err => next(err));
          
          },async(req, res, next) => {

            this.service.query(`${req.query.query}`).then(notes => res.send(notes as Note[])).catch(err => next(err));
          
          });
        this.NoteRouter.post('/', (req, res, next) => {
          if (!res.headersSent) res.setHeader('Content-Type', 'application/json');
        
           let body = req.body;

           this.service.save(body).then(note => res.send(note as Note)).catch(err => next(err));
           
        
        });    
        this.NoteRouter.put('/:id', (req, res, next) => {
          const body = req.body
          this.service.save(body).then(note => res.send(note as Note)).catch(err => next(err));
        
        });
        this.NoteRouter.delete('/', (req, res, next) => {
          this.service.delete(req.query.id).then(success => res.send(success)).catch(err => next(err));
       })

  }

}

export default NoteController;