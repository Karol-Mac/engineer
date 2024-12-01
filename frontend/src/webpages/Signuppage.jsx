import { useEffect, useState } from "react";
import RollbackPageButton from "../components/generic/RollbackPageButton";
import {LoginFunctions} from "../components/functions/LoginFunctions";
import {NavigateFunctions} from "../components/functions/NavigateFunctions";
import Footer from "../components/generic/Footer";
import HeaderSimple from "../components/generic/HeaderSimple";


const Signuppage = () => {
    const {handleLogin,handlePrivateSignup, handleCompanySignup} = LoginFunctions();
    const {openLoginpage} = NavigateFunctions();
    const [responseMessage, setResponseMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // false - login to user/admin Account
    // true - login to company Account
    const isSigningToCompanyItemName = "isSigningToCompany";
    const [isSigningToCompany,setIsSigningToCompany] = useState(JSON.parse(localStorage.getItem(isSigningToCompanyItemName)) === true);
    const [signupData, setSignupData] = useState({
        email: "",
        password: "",
        username: "",
        shopname:"",
        KRS:""
    });
    const [sigupDataImage, setSignupDataImage] = useState(null)

    useEffect(() => {
        localStorage.setItem(isSigningToCompanyItemName, JSON.stringify(isSigningToCompany));

        return () =>{
            localStorage.removeItem(isSigningToCompanyItemName);
        }
    }, [isSigningToCompany]);

    const checkForEmptyFields = () => {
        Object.entries(signupData).forEach(([key,value]) => {
            if(isSigningToCompany){
                if(key !== "username" && value.trim() === ""){
                    console.log("signupData:"+ key + " "+ value);
                    return true;
                }
            }else{
                if(key !== "shopname" && value.trim() === ""){
                    console.log("signupData:"+ key + " "+ value);
                    return true;
                }
            }
        })
        return false;
    }

    const handleChange = ({ currentTarget: input }) => {
        setSignupData({ ...signupData, [input.name]: input.value });
    };

    const handleImageUpload = (uploadEvent) =>{
        const uploadedFile = uploadEvent.target.files[0];

        setSignupDataImage(uploadedFile);
    }

    const setPrivateSignup = () => {
        setIsSigningToCompany(false);
        console.log("set up private Signuppage");
        displayAccountTypeSignup();
    }
    const setCompanySignup = () => {
        setIsSigningToCompany(true);
        console.log("set up company Signuppage");
        displayAccountTypeSignup();
    }

    const handleSingupAndLogin = async(e)=> {
        e.preventDefault();


        let response;
        if(checkForEmptyFields()){
            setResponseMessage("All fields are required"); // Set error message if passwords do not match
            return;
        }else if(signupData.password !== confirmPassword){
            setResponseMessage("Passwords do not match.");
            return;
        }else {

            if (isSigningToCompany) {
                response = await handleCompanySignup(e, signupData.shopname, signupData.email, signupData.password, signupData.KRS, sigupDataImage);
            } else {
                response = await handlePrivateSignup(e, signupData.username, signupData.email, signupData.password);
            }

            console.log("logging type company account: ", isSigningToCompany, " response ", response.success);
            if (response.success) {
                handleLogin(e, signupData.email, signupData.password, isSigningToCompany);
            } else {
                setResponseMessage(response.message);
            }
        }
    }

    const displayAccountTypeSignup = () => {
        return (
            <form onSubmit={handleSingupAndLogin} method="post">
                {isSigningToCompany ? (
                <div>
                <label htmlFor="shopname">Company name</label>
                <input
                    type="text"
                    name="shopname"
                    onChange={handleChange}
                    value={signupData.shopname}/>
                <br/>
                </div>
                ) : (
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={signupData.username}/>
                        <br/>
                    </div>
                )}
                <label htmlFor={"email"}>Email</label>
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
                <label htmlFor={"confirmPassword"}>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}/>
                <br/>
                {isSigningToCompany ? (
                    <div>
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
                    </div>) : (<div></div>)}
                <br/>
                <input type="submit" value="Submit" />
                <p>{responseMessage}</p>
            </form>
        );
    }


    return (
        <div className="d-flex flex-column min-vh-100">
            <HeaderSimple />
            <main className="flex-grow-1">
                <div id="signupContainer">
                    <div id="leftVertical" className="verticalSeparator">
                        <div id="LoginType">
                            <button id="privateAccountLogin" onClick={setPrivateSignup}>
                                Private Account
                            </button>
                            <button id="companyAccountLogin" onClick={setCompanySignup}>
                                Company Account
                            </button>
                        </div>
                        <h2>Signup to {isSigningToCompany ? "Company" : "Private account"}</h2>
                        {displayAccountTypeSignup()}
                    </div>
                    <div id="rightVertical" className="verticalSeparator">
                        <h2>Already have an account?</h2>
                        <button onClick={openLoginpage} className="createAccountButton">
                            Login to an existing account
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Signuppage;