import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Profil from './components/Profil';
import Agencije from './components/Agencije';
import Agencija from './components/Agencija';
import Student from './components/Student';
import NotFound from './components/NotFound';
import Putovanja from './components/Putovanja';
import Putovanje from './components/Putovanje';
import UserPutovanja from './components/UserPutovanja';
import Home from './components/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Router() {
  return <App />;
}

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
