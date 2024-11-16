import { useEffect, useState } from "react";
import RollbackPageButton from "../components/generic/RollbackPageButton";
import {LoginFunctions} from "../components/functions/LoginFunctions";
import {NavigateFunctions} from "../components/functions/NavigateFunctions";

import "../css/generalVisuals.css";
import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import HeaderSimple from "../components/generic/HeaderSimple";

const Loginpage = () => {
    const {handleLogin} = LoginFunctions()
    const {openSignuppage, openHomepage} = NavigateFunctions();

    const isLoggingToCompanyItemName = "isSigningToCompany";
    const [isLoggingToCompany, setIsLoggingToCompany] = useState(JSON.parse(localStorage.getItem(isLoggingToCompanyItemName)) === true);
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [responseMessage, setResponseMessage] = useState("");

    useEffect(() => {
        localStorage.setItem(isLoggingToCompanyItemName, JSON.stringify(isLoggingToCompany));

        return () =>{
            localStorage.removeItem(isLoggingToCompanyItemName);
        }
    }, [isLoggingToCompany]);

    const handleChange = ({ currentTarget: input }) => {
        setLoginData({ ...loginData, [input.name]: input.value });
    };

    const setPrivateLogging = () => {
        setIsLoggingToCompany(false);
    }
    const setCompanyLogging = () => {
        setIsLoggingToCompany(true);
    }

    const handleLoggingFunctions = async (e) => {
        const response = await handleLogin(e, loginData.email, loginData.password, isLoggingToCompany);

        if(response.success){
            console.log("Login successful");
        }else{
            setResponseMessage(response.message);
            console.log("Login Failed"+response.message);
        }
    }


    return (
        <div>
        <HeaderSimple/>
        <div id="loginContainer">
            <div id="leftVertical" className="verticalSeparator"> {/* Pionowy div dla czesci logowania */}
                <div id="LoginType">
                    <button id="privateAccountLogin" onClick={setPrivateLogging}>Private Account</button>
                    <button id="companyAccountLogin" onClick={setCompanyLogging}>Company Account</button>
                </div>
                <h2>Login to {isLoggingToCompany? "Company" : "Private account"}</h2>
                <form onSubmit={(e) => (handleLoggingFunctions(e))} method="post">
                    <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            value={loginData.email}
                            placeholder="Email or login" />
                    <br/>
                    <label htmlFor={"password"}>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={loginData.password}
                            placeholder="Password"/>
                    <br/>
                    <input type="submit" value="Login" />
                    <br/>
                    <p>{responseMessage}</p>
                </form>
            </div>
            <div id="rightVertical" className="verticalSeparator"> {/* Pionowy div dla czesci logowania */}
                <h2>Doesn't have an account?</h2>
                <button onClick={openSignuppage} className="createAccountButton">Create an Account</button>
                <h4>why is it worth to have an account on Nutrinexus:</h4>
                <div className="reasonContainer">
                    <img src="/images/icons/FavouriteImg.png" alt={"FavouriteImg.png"} className="reasonImages"/> <p className="reasonText">    Save your favourite products</p>
                </div>
                <div className="reasonContainer">
                    <img src="/images/icons/PreferenceImg.png" alt={"PreferenceImg.png"} className="reasonImages"/> <p className="reasonText">  Save your preferences</p>
                </div>
            </div>
        </div>
            <RollbackPageButton/>
            <Footer/>
        </div>
    );
};

export default Loginpage;