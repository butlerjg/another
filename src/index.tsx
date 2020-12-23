// import 'react-app-polyfill/ie11';   polyfill, core-js/stable, and regenerator-runtime for IE11
// import "core-js/stable";
// import "regenerator-runtime/runtime";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
//import register from './serviceWorker';


ReactDOM.render(
            <App />,
    document.getElementById('root'));

//register();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
