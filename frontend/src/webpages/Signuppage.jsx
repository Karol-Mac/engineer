import { useEffect, useState } from "react";
import RollbackPageButton from "../components/generic/RollbackPageButton";
import {LoginFunctions} from "../components/functions/LoginFunctions";
import {NavigateFunctions} from "../components/functions/NavigateFunctions";


const Signuppage = () => {
    const {handleLogin,handlePrivateSignup, handleCompanySignup} = LoginFunctions();
    const {openLoginpage} = NavigateFunctions();

    // false - login to user/admin Account
    // true - login to company Account
    const [isLoggingToCompany,setIsLoggingToCompany] = useState(false);
    const [signupData, setSignupData] = useState({
        email: "",
        password: "",
        username: "",
        shopname:"",
        KRS:""
    });

    const [sigupDataImage, setSignupDataImage] = useState(null)

    const handleChange = ({ currentTarget: input }) => {
        setSignupData({ ...signupData, [input.name]: input.value });
    };

    const handleImageUpload = (uploadEvent) =>{
        const uploadedFile = uploadEvent.target.files[0];
        const fileURL = URL.createObjectURL(uploadedFile);

        setSignupDataImage(uploadedFile);
    }

    const setPrivateSignup = () => {
        setIsLoggingToCompany(false);
        console.log("set up private Signuppage");
        displayAccountTypeSignup();
    }
    const setCompanySignup = () => {
        setIsLoggingToCompany(true);
        console.log("set up company Signuppage");
        displayAccountTypeSignup();
    }

    const handleSingupAndLogin = (e)=> {
        if(isLoggingToCompany){
            handleCompanySignup(e,signupData.shopname, signupData.email, signupData.password, signupData.KRS, sigupDataImage);
        }else{
            handlePrivateSignup(e,signupData.username, signupData.email, signupData.password);
        }

        handleLogin(e, signupData.email, signupData.password, isLoggingToCompany);
    }

    const displayAccountTypeSignup = () => {
        if(isLoggingToCompany) {
            return (
                <form onSubmit={handleSingupAndLogin} method="post">
                    <label htmlFor="shopname">Company name</label>
                    <input
                        type="text"
                        name="shopname"
                        onChange={handleChange}
                        value={signupData.shopname}/>
                    <br/>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={signupData.email}/>
                    <br/>
                    <label htmlFor={"password"}>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={signupData.password}/>
                    <br/>
                    <label htmlFor={"KRS"}>KRS number</label>
                    <input
                        type="text"
                        name="KRS"
                        onChange={handleChange}
                        value={signupData.KRS}/>
                    <br/>
                    <label htmlFor={"sellerImage"}>Seller image</label>
                    <input
                        type="file"
                        name="sellerImage"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            );
        }else{
            return (
                <form onSubmit={handleSingupAndLogin} method="post">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={signupData.username}/>
                    <br/>
                    <label htmlFor="email">Email or login</label>
                    <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={signupData.email}/>
                    <br/>
                    <label htmlFor={"password"}>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={signupData.password}/>

                    <input type="submit" value="Submit" />
                </form>
            );
        }
    }


        return (
            <div>
                <div id="leftVertical" className="verticalSeparator"> {/* Pionowy div dla czesci logowania */}
                    <div id="LoginType">
                        <button id="privateAccountLogin" onClick={setPrivateSignup}>Private Account</button>
                        <button id="companyAccountLogin" onClick={setCompanySignup}>Company Account</button>
                    </div>
                    <h2>Signup</h2>
                    {displayAccountTypeSignup()}
                </div>
                <div id="rightVertical" className="verticalSeparator"> {/* Pionowy div dla czesci logowania */}
                    <h2>Already have an account?</h2>
                    <p onClick={openLoginpage}>Login to an existing account</p>
                </div>
                <RollbackPageButton/>
            </div>

        );
};

export default Signuppage;