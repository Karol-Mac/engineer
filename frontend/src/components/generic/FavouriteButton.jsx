import React, { useEffect, useState } from "react";
import { FavouriteFunctions } from "../functions/FavouriteFunctions";
import { LoginFunctions } from "../functions/LoginFunctions";
import { NavigateFunctions } from "../functions/NavigateFunctions";
import NotificationAlert from "../generic/NotificationAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import styles from "../../css/FavouriteButton.module.css";

const FavouriteButton = ({ givenProductID, isInFavourite }) => {
    const { removeFavouriteProduct, saveFavouriteProduct, getFavouriteProducts } = FavouriteFunctions();
    const { isUserLogged, isNormalUser, isSeller, isAdminUser } = LoginFunctions();
    const { openLoginpage } = NavigateFunctions();
    const [productIsSelected, setProductIsSelected] = useState(false);
    const [notification, setNotification] = useState(null);
    const [notificationKey, setNotificationKey] = useState(0); // Klucz dla alertu

    const handleClick = async () => {
        if (isUserLogged()) {
            if (productIsSelected) {
                await removeFavouriteProduct({ productID: givenProductID });
                setProductIsSelected(false);
                setNotificationKey((prev) => prev + 1); // Zmieniamy klucz
                setNotification({
                    message: "Product removed from favourites!",
                    type: "alert-error",
                });
            } else {
                await saveFavouriteProduct({ productID: givenProductID });
                setProductIsSelected(true);
                setNotificationKey((prev) => prev + 1);
                setNotification({
                    message: "Product added to favourites!",
                    type: "alert-success",
                });
            }
        } else {
            openLoginpage();
        }
    };

    useEffect(() => {
        if (isUserLogged() && isNormalUser()) {
            const handleFetchingFavouriteProducts = async () => {
                const response = await getFavouriteProducts();

                if (response.success) {
                    const isSelected = response.favouriteProducts.some(
                        (product) => product.id === givenProductID
                    );
                    setProductIsSelected(isSelected);
                }
            };

            handleFetchingFavouriteProducts();
        }
    }, [isUserLogged(), givenProductID]);

    if (isSeller() || isAdminUser()) {
        return null;
    }

    return (
        <>
            {notification && (
                <NotificationAlert
                    key={notificationKey}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className={styles.favouriteButton} onClick={handleClick}>
                <FontAwesomeIcon icon={productIsSelected ? solidHeart : regularHeart} />
            </div>
        </>
    );
};

export default FavouriteButton;
