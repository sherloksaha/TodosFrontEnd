import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { App } from './App';
import { AuthContextProvider } from './context/authContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthContextProvider>
    <App />
    <ToastContainer />
  </AuthContextProvider>
);
reportWebVitals();
