import { useEffect, useState } from "react";
import RollbackPageButton from "../components/generic/RollbackPageButton";
import {LoginFunctions} from "../components/functions/LoginFunctions";
import {NavigateFunctions} from "../components/functions/NavigateFunctions";

const Loginpage = () => {
    const {handleLogin} = LoginFunctions()
    const {openSignuppage} = NavigateFunctions();

    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [isLoggingToCompany, setIsLoggingToCompany] = useState(false);

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
            console.log("Login Failed"+response.message);
        }
    }


    return (
        <div>
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
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div id="rightVertical" className="verticalSeparator"> {/* Pionowy div dla czesci logowania */}
                <h2>Doesn't have an account?</h2>
                <p onClick={openSignuppage}>Create an account</p>
                <h6>why is it worth to have an account on PLACEHOLDER NAME</h6>
                <img src={"img1"} alt={"img1Placeholder"}/>
                <img src={"img2"} alt={"img2Placeholder"}/>
                <img src={"img3"} alt={"img3Placeholder"}/>
                <img src={"img4"} alt={"img4Placeholder"}/>
            </div>
            <RollbackPageButton/>
        </div>
    );
};

export default Loginpage;