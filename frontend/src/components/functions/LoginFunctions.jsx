import { useEffect, useState } from "react";
import axios from "axios";

export const LoginFunctions = () => {
    const [error, setError] = useState("");


    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenType");
        window.location.reload();
    };

    const handleLogin = async(e, email, password, isLoggingToCompany)=>{
        e.preventDefault();

        try {
            var loginUrl;
            if(isLoggingToCompany){
                //logging to Company account
                loginUrl = "/api/auth/company/login";

            }else{
                //logging to User/Admin account
                loginUrl = "http://localhost:8080/api/auth/login";
            }
            const loginData = {email,password}

            const {loginData: res} = await axios.post(loginUrl, loginData);
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("tokenType", res.tokenType);
            localStorage.setItem("user", JSON.stringify(res.data.user));
        }catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }

    const handlePrivateSignup = async(e,username, email, password) =>{
        e.preventDefault();

        try {
            var loginUrl = "/api/auth/register";
            const loginData = {username,email,password}

            const {loginData: res} = await axios.post(loginUrl, loginData);
        }catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }

    const handleCompanySignup = async(e,shopName, email, password, KRS) =>{
        e.preventDefault();

        try {
            var loginUrl = "/api/auth/company/register";
            const loginData = {shopName,email,password,KRS}

            const {loginData: res} = await axios.post(loginUrl, loginData);
        }catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }

    const isUserLogged = async () => {
        const accessToken = localStorage.getItem("accessToken");
        return accessToken ? true : false;
    };

    return {
        handleLogout,
        handleLogin,
        handlePrivateSignup,
        handleCompanySignup,
        isUserLogged,
    };
};

