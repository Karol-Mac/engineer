//Jest to górny pasek zawierający logo, oraz przyciski do ulubionych produktów, logowania , rejesracji , profilu i wyświetlenia menu zarządzania profilu

import {useEffect, useState} from "react";
import {NavigateFunctions} from "../../functions/NavigateFunctions"
import {LoginFunctions} from "../../functions/LoginFunctions"; //not imported as default therefore it has to be in curly brackets
import styles from "../../../css/SideMenu.module.css";


const SideMenu = ({displaySideMenu}) => { //pass Token if token is null than display login + Register else display
    const {openCommentspage, openAccountpage, openComparepage} = NavigateFunctions()
    const { isUserLogged, handleLogout, isAdminUser, isSeller } = LoginFunctions();

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
    return (
        <div className={styles.sideMenu}>
            {/* Renderowanie przycisku "Compare" tylko dla użytkowników niebędących sprzedawcami ani administratorami */}
            {!isSeller() && !isAdminUser() && (
                <div onClick={openComparepage} className={styles.menuItem}>
                    <p>Compare</p>
                </div>
            )}
            <br /> {/* for debug */}
            <div onClick={openCommentspage} className={styles.menuItem}>
                <p>Comments</p>
            </div>
            <br /> {/* for debug */}
            <div onClick={openAccountpage} className={styles.menuItem}>
                <p>Your account</p>
            </div>
            {isSmbLogged ? (
                <>
                    <br /> {/* for debug */}
                    <div className={styles.menuItem}>
                        <div onClick={handleLogout} className={styles.menuItem}>
                            <p>Logout</p>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default SideMenu;