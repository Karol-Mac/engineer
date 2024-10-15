//Jest to górny pasek zawierający logo, oraz przyciski do ulubionych produktów, logowania , rejesracji , profilu i wyświetlenia menu zarządzania profilu

import {useState} from "react";
import {NavigateFunctions} from "../functions/NavigateFunctions" //not imported as default therefore it has to be in curly brackets
import SideMenu from "../specific/loginpage/SideMenu";
import "../../css/generalVisuals.css";
import RollbackPageButton from "./RollbackPageButton";


const HeaderSimple = () => { //pass Token if token is null than display login + Register else display
    const {openHomepage} = NavigateFunctions();


    return(
        <div id="header">
            <img src="/images/icons/HeaderLogoImg.png" alt="HeaderLogoImg.png" id="HeaderLogoImg" onClick={openHomepage}/>


        </div>
    );
};

export default HeaderSimple;