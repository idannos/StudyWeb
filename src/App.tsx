import React from 'react';
import logo from './logo.svg';
import Signin from "./Components/Signin/Signin";
import {Route, Routes} from "react-router-dom";
import './App.css';
import MainPage from "./Components/MainPage/MainPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Signin/>}/>
            <Route path="/mainPage" element={<MainPage/>}/>
        </Routes>

        // <div>
        //   <Signin/>
        // </div>
    );
}

export default App;
