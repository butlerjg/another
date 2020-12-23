import express from 'express';
import cors from 'cors';
import path from 'path';
import NoteController from './controllers/NoteController'
import { port as configPort }  from './utils/config'
import {errorHandler} from './utils/middleware'

// Initialize the app//
const app = express();

app.use(cors());
app.use(express.json())

app.use('/api/notes', new NoteController().routes())
app.use(errorHandler)


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  console.log('it thinks its production')
  app.use(express.static(path.join(__dirname, '../../build')));
  app.use(express.static(path.join(__dirname, '../../public')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}


const port = configPort || 8080;

// Start the server
app.listen(port, () => {console.log('app is listening on', port)});