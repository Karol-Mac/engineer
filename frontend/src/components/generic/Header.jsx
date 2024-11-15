//Jest to górny pasek zawierający logo, oraz przyciski do ulubionych produktów, logowania , rejesracji , profilu i wyświetlenia menu zarządzania profilu

import {useState} from "react";
import {NavigateFunctions} from "../functions/NavigateFunctions" //not imported as default therefore it has to be in curly brackets
import {LoginFunctions} from "../functions/LoginFunctions" //not imported as default therefore it has to be in curly brackets
import SideMenu from "../specific/loginpage/SideMenu";
import "../../css/generalVisuals.css";
import addProductpage from "../../webpages/AddProductpage";


const Header = () => { //pass Token if token is null than display login + Register else display
    const {openFavouritepage, openHomepage, openLoginpage, openSignuppage, openAddProductpage} = NavigateFunctions();
    const {isUserLogged, isNormalUser, isAdminUser, isSeller} = LoginFunctions();

    const [isSideMenuOpened,setIsSideMenuOpened] = useState(false);
    const openSideMenu = () => {
        if(isSideMenuOpened){
            setIsSideMenuOpened(false);
        }else{
            setIsSideMenuOpened(true)
        }
    }

    const renderAuthButtons = () => {
        if(isUserLogged()){
            if(isNormalUser()){
                return(<h4>Normal User</h4>);
            }else if(isAdminUser()){
                return(<h4>Admin User</h4>);
            }else if(isSeller()){
                return(
                    <>
                       <div href="" onClick={openAddProductpage} id="LoginBtn">Add Product</div>
                    </>
                );
            }
        }else{
            return (<>
                <div href="" onClick={openLoginpage} id="LoginBtn">Login</div>
                {/*<br /> /!* for debug *!/*/}
                <div href="" onClick={openSignuppage} id="SignupBtn">Signup</div>
            </>);
        }
    }

    return(
        <div id="header">
            <img src="/images/icons/HeaderLogoImg.png" alt="HeaderLogoImg.png" id="HeaderLogoImg" onClick={openHomepage}/>
            <div id="rightItems">
            {/*<br /> /!* for debug *!/*/}
            <img src="/images/icons/FavouriteImg.png" alt="FavouriteImg.png" id="FavouriteImg" onClick={openFavouritepage}/>

            {renderAuthButtons()}
            {/*<br /> /!* for debug *!/*/}
            <img src="/images/icons/SideMenuLogoImg.png" alt="SideMenuLogoImg.png" id="SideMenuLogoImg" onClick={openSideMenu}/>
            </div>
            <SideMenu displaySideMenu={isSideMenuOpened}/>
        </div>
    );
};

export default Header;