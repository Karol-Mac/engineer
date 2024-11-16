import {LoginFunctions} from "../components/functions/LoginFunctions";
import {NavigateFunctions} from "../components/functions/NavigateFunctions";

const Accountpage = () => {

    const {accountsVariants, currentAccountType} = LoginFunctions();
    const {openFavouritepage, openAccountSettingpage, openSellerProductspage} = NavigateFunctions();

    const accountTypes = accountsVariants();
    const accountType = currentAccountType();

    const displayAccountContents = () => {
        switch(accountType){
            case accountTypes.USER :{
                return <div>
                    <h3 onClick={openFavouritepage}>Favourite products</h3>
                </div>
            }

            case accountTypes.SELLER :{
                return <h2  onClick={openSellerProductspage}>Seller panel</h2>
            }

            case accountTypes.ADMIN :{
                return  <div>
                            <h3>Admin report panel</h3>
                        </div>
            }

            default:{
                return <h1>Unknown Account Type !!!</h1>
            }
        }
    }


    return (
        <div>
            <h1>Account Setting page: {accountType}</h1>

            <h3 onClick={openAccountSettingpage}>Edit account</h3>

            {displayAccountContents()}

        {/*    All types have update profile*/}

        {/*    normal user have fav*/}
        {/*    seller  has seller panel */}
        {/*    admin has admin panel*/}

        </div>

    );

};

export default Accountpage;