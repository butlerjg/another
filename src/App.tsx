import React, { useState } from 'react';
import './App.css';
import NoteForm from './components/notes/NoteForm';
import EditNote from './components/notes/EditNote';
import Navhead from './components/shared/Navhead';
import { Container, Row, Col } from 'reactstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const App = () => {
  
  return (
      <Router>         
          <Navhead />
          <Container className="content">
            <Row>
                <Col>
                  <Switch>
                    <Route path="/" exact children={<NoteForm />} />
                    <Route path="/note/:id" children={<EditNote />} />                  
                  </Switch>
                </Col>  
            </Row>
          </Container>
      </Router>
  )
}

export default App;