import {FavouriteFunctions} from "../functions/FavouriteFunctions";
import {useEffect, useState} from "react";
import {LoginFunctions} from "../functions/LoginFunctions";
import {NavigateFunctions} from "../functions/NavigateFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import styles from "../../css/FavouriteButton.module.css";
const FavouriteButton = ({givenProductID, isInFavourite}) => {
    const {removeFavouriteProduct, saveFavouriteProduct, getFavouriteProducts} = FavouriteFunctions();
    const {isUserLogged, isNormalUser, isSeller, isAdminUser} = LoginFunctions();
    const {openLoginpage} = NavigateFunctions();
    const [productIsSelected,setProductIsSelected] = useState(false);

    const [favouriteProducts, setFavouriteProducts] = useState(null);

    const handleClick = async () => {
        if (isUserLogged()) {
            console.log("isInFavourite: ",isInFavourite," productIsSelected:",productIsSelected);
            if (productIsSelected) {
                console.log("Removed product from favourites");
                await removeFavouriteProduct({ productID: givenProductID });
                setProductIsSelected(false);
            } else {
                console.log("Saved product to favourites");
                await saveFavouriteProduct({ productID: givenProductID });
                setProductIsSelected(true);
            }
        } else {
            openLoginpage();
        }
    };

    useEffect(() => {
        if(isUserLogged() && isNormalUser()) {
            const isFavourite = (response) => {
                const isSelected = response.some(product => product.id === givenProductID);
                setProductIsSelected(isSelected);
            }

            const handleFetchingFavoruiteProducts = async () => {
                const response = await getFavouriteProducts();


                if (response.success) {
                    setFavouriteProducts(response.favouriteProducts);

                    isFavourite(response.favouriteProducts);

                    if (response.removedProductsName != null) {
                        console.log("Products are no longer available: ", response.removedProductsName);
                    }
                    console.log("Fetching Fav successful");
                } else {
                    //Error overlay that displayes message and have button that opens Homepage
                    console.log("Fetching Fav Failed \"" + response.message + "\"");
                }
            }

            handleFetchingFavoruiteProducts()
        }
    }, [isUserLogged(), productIsSelected]);

    if (isSeller() || isAdminUser()) {
        return null;
    }

    return(

        <div className={styles.favouriteButton} onClick={handleClick}>
            {/*{productIsSelected ? <p>product is in favourites</p>:<p>product can be added to favourites</p>}*/}
            <FontAwesomeIcon icon={productIsSelected ? solidHeart : regularHeart} />
        </div>
    );
};

export default FavouriteButton;
