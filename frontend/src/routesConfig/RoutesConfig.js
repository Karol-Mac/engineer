import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Homepage from './webpages/Homepage';

const RoutesConfig = () => {
    return (
        <Routes>

            <Route path="/" exact element={<Homepage/>} />


        </Routes>
    )


}


