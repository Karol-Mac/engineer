import { useEffect, useState } from "react";
import axios from "axios";
import {NavigateFunctions} from "./NavigateFunctions";

export const LoginFunctions = () => {
    const {openHomepage} = NavigateFunctions();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenType");
        localStorage.removeItem("user");
        window.location.reload();
    };



    const handleLogin = async(e, email, password, isLoggingToCompany)=>{
        e.preventDefault();
        console.log("Attempting to log in");
        try {
            let loginUrl;
            if(isLoggingToCompany){
                //logging to Company account
                loginUrl = "http://localhost:8080/api/auth/company/login";

            }else{
                //logging to User/Admin account
                loginUrl = "http://localhost:8080/api/auth/login";
            }

            //Commented code is for debugging
            // console.log("email: "+email+ " password = "+password+ " loginUrl= "+loginUrl);
            await axios.post(loginUrl, {email,password}).then((res)=>{

                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("tokenType", res.data.tokenType);
                localStorage.setItem("user", JSON.stringify(res.data.user));
            });

            openHomepage();
            return{ success: true};
        }catch (error) {
            let errorMessage;
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ){
                errorMessage = error.response.data.message || "Unknown error";
            }else if(error.response){
                errorMessage = error.response;
            }

            return{ success: false, message: errorMessage};
        }
    };

    const handlePrivateSignup = async(e,username, email, password) =>{
        e.preventDefault();
        console.log("Signup Data: ", username,email, password);
        try {
            var signupUrl = "http://localhost:8080/api/auth/register";
            const signupData = {username,email,password}

            const res = await axios.post(signupUrl, signupData);
            console.log("Private account is created \""+res.data.message+"\"");
            return{ success: true};
        }catch (error) {
            let errorMessage;
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                errorMessage = error.response.data.message || "Unknown error";
            }

            // console.log("(PRIVATE) setResponseMessage: "+ errorMessage);
            return{ success: false, message: errorMessage};
        }
    };

    const handleCompanySignup = async(e,shopName, email, password, KRS,sellerImage) =>{
        e.preventDefault();

        const formData = new FormData();

        try {
            var signupUrl = "http://localhost:8080/api/auth/company/register";
            const signupData = {shopName, email, password,krsNumber: KRS}

            formData.append('company', new Blob([JSON.stringify(signupData)], { type: 'application/json' }));
            formData.append("file", sellerImage);

            const res = await axios.post(signupUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }});

            console.log("Company account is created \""+res.data.message+"\"");
            return{ success: true};
        }catch (error) {
            let errorMessage;
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                errorMessage = error.response.data.message || "Unknown error";
            }

            // console.log("(Company) setResponseMessage: "+ errorMessage);
            return{ success: false, message: errorMessage};
        }
    };

    const isUserLogged = () => {
        const accessToken = localStorage.getItem("accessToken");
        return accessToken ? true : false;
    };

    const isNormalUser = () => {
        const tokenType = localStorage.getItem("tokenType");
        return tokenType == "USER" ? true : false;
    };

    const isAdminUser = () => {
        const tokenType = localStorage.getItem("tokenType");
        return tokenType == "ADMIN" ? true : false;
    };

    const isSeller = () => {
        const tokenType = localStorage.getItem("tokenType");
        return tokenType == "SELLER" ? true : false;
    };

    return {
        handleLogout,
        handleLogin,
        handlePrivateSignup,
        handleCompanySignup,
        isUserLogged,
        isNormalUser,
        isAdminUser,
        isSeller
    };
};

