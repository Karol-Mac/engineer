import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Homepage from '../webpages/Homepage';
import Login from '../webpages/Login';
import Signup from '../webpages/Signup';

const RoutesConfig = () => {
    const accessToken = localStorage.getItem("accessToken");
    const tokenType = localStorage.getItem("tokenType");


    return (
        <Routes>
            <Route path="/" exact element={<Homepage/>} />


            <Route path="/login" exact element={<Login/>} />
            <Route path="/signup" exact element={<Signup/>} />

        </Routes>
    )


}

export default RoutesConfig;


