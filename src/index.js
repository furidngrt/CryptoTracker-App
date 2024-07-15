import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Atur import untuk CSS kustom di sini
import 'bootstrap/dist/css/bootstrap.min.css'; // Atur impor untuk Bootstrap CSS di sini
import './App.css'; // Atur impor untuk CSS kustom di sini
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
