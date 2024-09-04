//Jest to górny pasek zawierający logo, oraz przyciski do ulubionych produktów, logowania , rejesracji , profilu i wyświetlenia menu zarządzania profilu

import {useEffect, useState} from "react";
import {NavigateFunctions} from "../functions/NavigateFunctions" //not imported as default therefore it has to be in curly brackets
import SideMenu from "../loginpage/SideMenu";
import {NavigateFunction} from "react-router-dom";
const Header = () => { //pass Token if token is null than display login + Register else display
    const {openFavouritepage, openHomepage, openLoginpage, openSignuppage} = NavigateFunctions();

    const [isSideMenuOpened,setIsSideMenuOpened] = useState(false);
    const openSideMenu = () => {
        if(isSideMenuOpened){
            setIsSideMenuOpened(false);
        }else{
            setIsSideMenuOpened(true)
        }
    }

    return(
        <div id="header">
            <img src="HeaderLogoImg.jpg" alt="HeaderLogoImg.jpg" id="HeaderLogoImg" onClick={openHomepage}/>

            <br /> {/* for debug */}
            <img src="FavouriteImg.jpg" alt="FavouriteImg.jpg" id="FavouriteImg" onClick={openFavouritepage}/>
            <br /> {/* for debug */}
            <a href="" onClick={openLoginpage} id="LoginBtn">Login</a>
            <br /> {/* for debug */}
            <a href="" onClick={openSignuppage} id="SignupBtn">Signup</a>

            <br /> {/* for debug */}
            <img src="SideMenuLogoImg.jpg" alt="SideMenuLogoImg.jpg" id="SideMenuLogoImg" onClick={openSideMenu}/>
            <SideMenu displaySideMenu={isSideMenuOpened}/>
        </div>
    );
};

export default Header;