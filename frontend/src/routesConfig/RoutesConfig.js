import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Homepage from './webpages/Homepage';
import Login from './webpages/Login';

const RoutesConfig = () => {
    return (
        <Routes>

            <Route path="/" exact element={<Homepage/>} />
            <Route path="/login" exact element={<Login/>} />
            <Route path="/signup" exact element={<Homepage/>} />

        </Routes>
    )


}


