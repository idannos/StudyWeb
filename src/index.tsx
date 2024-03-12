import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const home = window.location.href.includes("localhost") ? "/" : process.env.PUBLIC_URL
root.render(
    <React.StrictMode>
        <BrowserRouter basename={home}>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
