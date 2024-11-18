import {LoginFunctions} from "../components/functions/LoginFunctions";
import {NavigateFunctions} from "../components/functions/NavigateFunctions";
import styles from '../css/Accountpage.module.css';
import HeaderSimple from "../components/generic/HeaderSimple";
import Footer from "../components/generic/Footer";

const Accountpage = () => {

    const {accountsVariants, currentAccountType} = LoginFunctions();
    const {openFavouritepage, openAccountSettingpage, openSellerProductspage, openAdminpanelpage} = NavigateFunctions();

    const accountTypes = accountsVariants();
    const accountType = currentAccountType();

    const displayAccountContents = () => {
        switch(accountType){
            case accountTypes.USER :{
                return <div>
                    <h3 onClick={openAccountSettingpage} className={styles.button}>Edit account</h3>
                    <h3 onClick={openFavouritepage} className={styles.button}>Favourite products</h3>
                </div>
            }

            case accountTypes.SELLER :{
                return <h2  onClick={openSellerProductspage} className={styles.button}>Seller panel</h2>
            }

            case accountTypes.ADMIN :{
                return  <div>
                            <h3 onClick={openAccountSettingpage} className={styles.button}>Edit account</h3>
                            <h3 onClick={openAdminpanelpage} className={styles.button}>Admin report panel</h3>
                        </div>
            }

            default:{
                return <h1>Unknown Account Type !!!</h1>
            }
        }
    }


    return (
        <div className={styles.accountPage}>
            <HeaderSimple/>
            <div className={styles.content}>
                <h1>Account Setting page: {accountType}</h1>
                {displayAccountContents()}
            </div>

        {/*    All types have update profile*/}

        {/*    normal user have fav*/}
        {/*    seller  has seller panel */}
        {/*    admin has admin panel*/}
            <Footer/>
        </div>

    );

};

export default Accountpage;