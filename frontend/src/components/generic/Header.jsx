import { useState } from "react";
import { NavigateFunctions } from "../functions/NavigateFunctions";
import { LoginFunctions } from "../functions/LoginFunctions";
import SideMenu from "../specific/loginpage/SideMenu";
import styles from "../../css/Header.module.css";

const Header = () => {
    const { openFavouritepage, openHomepage, openLoginpage, openSignuppage, openAddProductpage } = NavigateFunctions();
    const { isUserLogged, isNormalUser, isAdminUser, isSeller } = LoginFunctions();

    const [isSideMenuOpened, setIsSideMenuOpened] = useState(false);
    const openSideMenu = () => {
        if (isSideMenuOpened) {
            setIsSideMenuOpened(false);
        } else {
            setIsSideMenuOpened(true);
        }
    }

    const renderAuthButtons = () => {
        if (isUserLogged()) {
            if (isNormalUser()) {
                return (<h4>Normal User</h4>);
            } else if (isAdminUser()) {
                return (<h4>Admin User</h4>);
            } else if (isSeller()) {
                return (
                    <>
                        <div href="" onClick={openAddProductpage} className={styles.LoginBtn}>Add Product</div>
                    </>
                );
            }
        } else {
            return (
                <>
                    <div href="" onClick={openLoginpage} className={styles.LoginBtn}>Login</div>
                    <div href="" onClick={openSignuppage} className={styles.SignupBtn}>Signup</div>
                </>
            );
        }
    }

    return (
        <div id="header">
            <img src="/images/icons/HeaderLogoImg.png" alt="HeaderLogoImg.png" className={styles.HeaderLogoImg} onClick={openHomepage} />
            <div id="rightItems">
                {/* Tylko dla normalnych użytkowników i adminów */}
                {!isSeller() && (
                    <img src="/images/icons/FavouriteImg.png" alt="FavouriteImg.png" className={styles.FavouriteImg} onClick={openFavouritepage} />
                )}

                {renderAuthButtons()}

                <img src="/images/icons/SideMenuLogoImg.png" alt="SideMenuLogoImg.png" className={styles.SideMenuLogoImg} onClick={openSideMenu} />
            </div>
            <SideMenu displaySideMenu={isSideMenuOpened} />
        </div>
    );
};

export default Header;
