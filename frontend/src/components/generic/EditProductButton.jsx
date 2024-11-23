import React, { useEffect, useState } from "react";
import { FavouriteFunctions } from "../functions/FavouriteFunctions";
import { LoginFunctions } from "../functions/LoginFunctions";
import { NavigateFunctions } from "../functions/NavigateFunctions";
import NotificationAlert from "../generic/NotificationAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import styles from "../../css/FavouriteButton.module.css";
import {faWrench} from "@fortawesome/free-solid-svg-icons/faWrench";

const FavouriteButton = ({givenProductID}) => {
    const { openEditProductpage } = NavigateFunctions();

    const handleClick = async (e) => {
        e.stopPropagation();
        openEditProductpage(givenProductID);
    }

    return (
        <div className="btn btn-primary" onClick={handleClick}>
            <FontAwesomeIcon icon={faWrench} />
        </div>
    );
};

export default FavouriteButton;
