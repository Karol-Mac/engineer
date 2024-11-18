//Jest to górny pasek zawierający logo, oraz przyciski do ulubionych produktów, logowania , rejesracji , profilu i wyświetlenia menu zarządzania profilu

import {useEffect, useState} from "react";
import {NavigateFunctions} from "../../functions/NavigateFunctions"
import {LoginFunctions} from "../../functions/LoginFunctions"; //not imported as default therefore it has to be in curly brackets

const SideMenu = ({displaySideMenu}) => { //pass Token if token is null than display login + Register else display
    const {openCommentspage, openAccountpage, openComparepage} = NavigateFunctions()
    const {isUserLogged,handleLogout} = LoginFunctions()

    const [isSmbLogged, setIsSmbLogged] = useState(false);



    useEffect(() => {
        if (displaySideMenu) {
            const checkUserLoggedStatus = async () => {
                const loggedIn = await isUserLogged();
                setIsSmbLogged(loggedIn);
            };

            checkUserLoggedStatus();
        }
    }, [displaySideMenu, isUserLogged]);


    if(!displaySideMenu) {
        return ;
    }
    return(
        <div id="SideMenu">
            <div onClick={openComparepage} id="CompareImg">
                {/*<img src="CompareLogoImg.jpg" alt="CompareLogoImg.jpg" id="CompareLogoImg2"/>*/}
                <p>Compare</p>
            </div>
            <br /> {/* for debug */}
            <div  onClick={openCommentspage} id="CommentImg">
                {/*<img src="CommentsLogoImg.jpg" alt="CommentsLogoImg.jpg" id="CommentsLogoImg2"/>*/}
                <p>Comments</p>
            </div>
            <br /> {/* for debug */}
            <div onClick={openAccountpage} id="AccountSettingImg">
                {/*<img src="AccountSettingLogoImg.jpg" alt="AccountSettingLogoImg.jpg" id="AccountSettingImg2"/>*/}
                <p>Your account</p>
            </div>
            <br /> {/* for debug */}
            <div id="DarkModeSideMenu">
                <div onClick={openAccountpage} id="DarkModeImg">
                    {/*<img src="DarkModeLogoImg.jpg" alt="DarkModeLogoImg.jpg" id="DarkModeLogoImg"/>*/}
                    <p>Dark mode</p>
                    {/*/!*<input type="checkbox"/>*!/  dodać toggle button?*/}
                </div>
            </div>
            {isSmbLogged ? (
                <>
                    <br /> {/* for debug */}
                    <div id="LogoutSideMenu">
                        <div onClick={handleLogout} id="LoggoutImg">
                            <img src="LoggoutLogoImg.jpg" alt="LoggoutLogoImg.jpg" id="LoggoutLogoImg"/>
                            <p>Logout</p>
                            {/*/!*<input type="checkbox"/>*!/  dodać toggle button?*/}
                        </div>
                    </div>
                </>
            ) : (<></>)}
        </div>
    );


};

export default SideMenu;