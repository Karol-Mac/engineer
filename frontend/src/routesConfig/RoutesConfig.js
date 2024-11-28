import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Homepage from '../webpages/Homepage';
import Loginpage from '../webpages/Loginpage';
import Signuppage from '../webpages/Signuppage';
import Favouritepage from '../webpages/Favouritepage';
import AddProductpage from '../webpages/AddProductpage';
import Accountpage from '../webpages/Accountpage';
import ContactUspage from '../webpages/Contactpage';
import CompareProductpage from '../webpages/CompareProductpage';
import Searchpage from '../webpages/Searchpage';
import Productpage from '../webpages/Productpage';
import Reportpage from '../webpages/Reportpage';
import AccountSettingpage from '../webpages/AccountSettingpage';
import SellerProductsListpage from '../webpages/SellerProductsListpage';
import AdminReportPanelpage from '../webpages/AdminReportPanelpage';
import Commentspage from "../webpages/Commentspage";
import AddCommentspage from "../webpages/AddCommentspage";
import EditProductpage from "../webpages/EditProductpage";
import AdminReportVerdictpage from "../webpages/AdminReportVerdictpage";

const RoutesConfig = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [tokenType, setTokenType] = useState(localStorage.getItem("tokenType"));

    useEffect(() => {
        setAccessToken(localStorage.getItem("accessToken"));
        setTokenType(localStorage.getItem("tokenType"));
    }, [tokenType, accessToken]);

    return (
        <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/login" exact element={<Loginpage />} />
            <Route path="/signup" exact element={<Signuppage />} />

            {accessToken ? (
                <>
                    <Route path="/favourite" exact element={<Favouritepage />} />
                    <Route path="/account" exact element={<Accountpage />} />
                    <Route path="/account/setting" exact element={<AccountSettingpage />} />
                    <Route path="/account/adminpanel" exact element={<AdminReportPanelpage />} />
                    <Route path="/account/adminpanel/verdict/:reportID" exact element={<AdminReportVerdictpage />} />
                    <Route path="/comments" exact element={<Commentspage />} />
                    <Route path="/comments/add" exact element={<AddCommentspage />} />
                </>
            ) : (
                <>
                    <Route path="/favourite" element={<Navigate replace to="/login" />} />
                    <Route path="/account" element={<Navigate replace to="/login" />} />
                    <Route path="/account/setting" element={<Navigate replace to="/login" />} />
                    <Route path="/account/adminpanel" element={<Navigate replace to="/login" />} />
                    <Route path="/account/adminpanel/verdict/:reportID" element={<Navigate replace to="/login" />} />
                    <Route path="/comments" element={<Navigate replace to="/login" />} />
                    <Route path="/comments/add" element={<Navigate replace to="/login" />} />
                </>
            )}

            <Route path="/add" exact element={<AddProductpage />} />
            <Route path="/edit/:productID" exact element={<EditProductpage />} />
            <Route path="/report/:reportType/:reportID" exact element={<Reportpage />} />


            <Route path="/account/products" exact element={<SellerProductsListpage />} />
            <Route path="/contact" exact element={<ContactUspage />} />
            <Route path="/search" exact element={<Searchpage />} />
            <Route path="/compare" exact element={<CompareProductpage />} />
            <Route path="/product/:id" exact element={<Productpage />} />
        </Routes>
    );
};

export default RoutesConfig;