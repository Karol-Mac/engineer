import React, {useEffect, useState} from "react";
import {CompareFunctions} from "../functions/CompareFunctions";
import NotificationAlert from "../generic/NotificationAlert";
import {FaWeight, FaWeightHanging} from "react-icons/fa";
import styles from "../../css/CompareProductsButton.module.css";

const CompareProductsButton = ({givenProductID}) => {
    const {
        addProductComparisonList,
        removeProductComparisonList,
        isSpecificProductSelectedToCompare,
    } = CompareFunctions();

    const [productSelectedToCompare, setProductSelectedToCompare] = useState(false);
    const [notification, setNotification] = useState(null);
    const [notificationKey, setNotificationKey] = useState(0);

    const handleClick = () => {
        if (productSelectedToCompare) {
            removeProductComparisonList(givenProductID);
            setProductSelectedToCompare(false);
            setNotificationKey((prev) => prev + 1);
            setNotification({
                message: "Product removed from comparison!",
                type: "alert-error",
            });
        } else {
            addProductComparisonList({givenProductID});
            setProductSelectedToCompare(true);
            setNotificationKey((prev) => prev + 1);
            setNotification({
                message: "Product added to comparison!",
                type: "alert-success",
            });
        }
    };

    useEffect(() => {
        // Ustawienie stanu w oparciu o dane z localStorage
        const isSelected = isSpecificProductSelectedToCompare(givenProductID);
        setProductSelectedToCompare(isSelected);
    }, [givenProductID]);

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
            <div onClick={handleClick} id="CompareImg" className={styles.compareButton}>
                {productSelectedToCompare ? (
                    <FaWeight size={24}/>
                ) : (
                    <FaWeightHanging size={24}/>
                )}
            </div>
        </>
    );
};

export default CompareProductsButton;
