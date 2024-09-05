import { useEffect, useState } from "react";
import RollbackPageButton from "../components/generic/RollbackPageButton";
import {LoginFunctions} from "../components/functions/LoginFunctions";

const Loginpage = () => {
    const {handleLogin} = LoginFunctions()

    const [loginData, setLoginData] = useState({ email: "", password: "" });

    // false - login to user/admin Account
    // true - login to company Account
    var isLoggingToCompany = false;

    const handleChange = ({ currentTarget: input }) => {
        setLoginData({ ...loginData, [input.name]: input.value });
    };

    const setPrivateLogging = () => {
        isLoggingToCompany = false;
    }
    const setCompanyLogging = () => {
        isLoggingToCompany = true;
    }


    return (
        <div>
            <div id="leftVertical" className="verticalSeparator"> {/* Pionowy div dla czesci logowania */}
                <div id="LoginType">
                    <button id="privateAccountLogin" onClick={setPrivateLogging}>Private Account</button>
                    <button id="companyAccountLogin" onClick={setCompanyLogging}>Company Account</button>
                </div>
                <h2>Login</h2>
                <form onSubmit={(e) => handleLogin(e, loginData.email, loginData.password, isLoggingToCompany)} method="post">
                    <label htmlFor="email">Email or login</label>
                        <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            value={loginData.email}
                            placeholder="Email or login" />
                    <br/>
                    <label htmlFor={"password"}>Password</label>
                        <input
                            type="text"
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
                <a href={"/signup"}>Create an account</a>
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