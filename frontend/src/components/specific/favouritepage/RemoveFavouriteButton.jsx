import {useEffect, useState} from "react";
import axios from "axios";
import {NavigateFunctions} from "../../functions/NavigateFunctions";
import {FavouriteFunctions} from "../../functions/FavouriteFunctions";
import styles from "../../../css/RemoveFavouriteButton.module.css"


function RemoveFavouriteButton ({favouriteProductID}) {
    const {refreshPage} = NavigateFunctions();
    const {removeFavouriteProduct} = FavouriteFunctions();

    const handleRemoveFavouriteClick = async (e) => {
        e.stopPropagation();
        console.log("Removing product from favourites with ID: ", favouriteProductID);
        const response = await removeFavouriteProduct({productID: favouriteProductID});
        if (response.success) {
            console.log("Product successfully removed from favourites.");
            refreshPage();
        } else {
            console.error("Failed to remove product from favourites: ", response.message);
        }
    };


    return (
        <div className={styles.removeButtonContainer} onClick={handleRemoveFavouriteClick}>
            {/*importing doesnt work :(*/}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet"/>
            <i className="bi bi-heartbreak-fill ${styles.removeButtonIcon}"></i>
        </div>
    );
}

export default RemoveFavouriteButton;