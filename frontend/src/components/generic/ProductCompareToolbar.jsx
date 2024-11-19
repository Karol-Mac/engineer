import { CompareFunctions } from "../functions/CompareFunctions";
import { useEffect, useState } from "react";
import { CustomEventsControler } from "../functions/CustomEventsControler";
import styles from "../../css/ProductCompareToolbar.module.css";
import { NavigateFunctions } from "../functions/NavigateFunctions";

const ProductCompareToolbar = () => {
    const { isAnyProductToCompareSelected, initializeProductComparisonList } = CompareFunctions();
    const { addListenerDispatchOnCompareUpdate, removeListenerDispatchOnCompareUpdate } = CustomEventsControler();
    const [isProductCompareToolbarVisible, setIsProductCompareToolbarVisible] = useState(false);
    const [isToolbarHidden, setIsToolbarHidden] = useState(false);
    const { openComparepage } = NavigateFunctions();

    initializeProductComparisonList();

    const handleCompareStorageChange = () => {
        console.log("Event: CompareStorage has been updated");
        setIsProductCompareToolbarVisible(isAnyProductToCompareSelected());
    };

    useEffect(() => {
        addListenerDispatchOnCompareUpdate(handleCompareStorageChange);
        handleCompareStorageChange();

        return () => {
            removeListenerDispatchOnCompareUpdate(handleCompareStorageChange);
        };
    }, []);

    const handleClick = () => {
        openComparepage();
    };

    const toggleToolbarVisibility = () => {
        setIsToolbarHidden(!isToolbarHidden);
    };

    return (
        <>
            <div className={`${styles.toolbarContainer} ${isToolbarHidden ? styles.toolbarHidden : ""}`}>
                <button className={styles.closeButton} onClick={toggleToolbarVisibility}>
                    &times;
                </button>
                <div>
                    {isProductCompareToolbarVisible ? (
                        <div className={styles.toolbarVisible} onClick={handleClick}>
                            <p>Compare is visible</p>
                        </div>
                    ) : (
                        <div>
                            {/*<p>Compare is NOT visible</p>*/}
                        </div>
                    )}
                    {/*<img src="CompareLogoImg.jpg" alt="CompareLogoImg.jpg" id="CompareLogoImg2"/>*/}
                </div>
            </div>
            {isToolbarHidden && (
                <button className={styles.showToolbarButton} onClick={toggleToolbarVisibility}>
                    &gt;
                </button>
            )}
        </>
    );
};

export default ProductCompareToolbar;