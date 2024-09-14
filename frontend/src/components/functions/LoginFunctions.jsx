import { useEffect, useState } from "react";
import axios from "axios";

export const LoginFunctions = () => {
    const [requestUrl, setRequestUrl] = useState("");


    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenType");
        localStorage.removeItem("user");
        window.location.reload();
    };

    const handleLogin = async(e, email, password, isLoggingToCompany)=>{
        e.preventDefault();

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
                // console.log("res.data.accessToken: "+res.data.accessToken+ " \n" +
                //     "res.data.tokenType = "+res.data.tokenType);

                localStorage.setItem("accessToken", res.data.accessToken);
                // console.log("accessToken Item: "+res.data.accessToken);
                localStorage.setItem("tokenType", res.data.tokenType);
                // console.log("tokenType Item: "+res.data.tokenType);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                // console.log("user Item: "+JSON.stringify(res.data.user));

            });

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

        try {
            var signupUrl = "http://localhost:8080/api/auth/register";
            const signupData = {username,email,password}


            const {loginData: res} = await axios.post(signupUrl, signupData);
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

            return{ success: false, message: errorMessage};
        }
    };

    const handleCompanySignup = async(e,shopName, email, password, KRS,sellerImage) =>{
        e.preventDefault();

        const formData = new FormData();

        try {
            var signupUrl = "http://localhost:8080/api/auth/company/register";
            const signupData = {shopName: shopName,email: email,password: password,krsNumber: KRS}
            formData.append('company', new Blob([JSON.stringify(signupData)], { type: 'application/json' }));
            formData.append("file", sellerImage);

            await axios.post(signupUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },}).then((res)=>{

            });
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

            return{ success: false, message: errorMessage};
        }
    };

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

