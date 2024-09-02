import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Homepage from '../webpages/Homepage';
import Loginpage from '../webpages/Loginpage';
import Signuppage from '../webpages/Signuppage';
import Favouritepage from '../webpages/Favouritepage';
import Accountpage from "../webpages/Accountpage";
import ContactUspage from "../webpages/Contactpage";

const RoutesConfig = () => {
    const accessToken = localStorage.getItem("accessToken");
    const tokenType = localStorage.getItem("tokenType");


    return (
        <Routes>
            <Route path="/" exact element={<Homepage/>} />


            <Route path="/login" exact element={<Loginpage/>} />
            <Route path="/signup" exact element={<Signuppage/>} />
            <Route path="/favourite" exact element={<Favouritepage/>} />
            <Route path="/account" exact element={<Accountpage/>} />
            <Route path="/contact" exact element={<ContactUspage/>} />

        </Routes>
    )


}

export default RoutesConfig;


