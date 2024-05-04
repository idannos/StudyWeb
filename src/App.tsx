import React from 'react';
import Signin from "./Components/Signin/Signin";
import {Route, Routes} from "react-router-dom";
import './App.css';
import MainPage from "./Components/MainPage/MainPage";
import FileData from "./Components/FileData/FileData";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Signin/>}/>
            <Route path="/mainPage" element={
                <PrivateRoute>
                    <MainPage/>
                </PrivateRoute>
            }/>
            <Route path="/fileData" element={
                <PrivateRoute>
                    <FileData/>
                </PrivateRoute>
            }/>
        </Routes>
    );
}

export default App;
