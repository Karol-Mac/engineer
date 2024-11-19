import {CompareFunctions} from "../functions/CompareFunctions";
import {useEffect, useState} from "react";
import {CustomEventsControler} from "../functions/CustomEventsControler";
import styles from "../../css/ProductCompareToolbar.module.css";
import {NavigateFunctions} from "../functions/NavigateFunctions";

const ProductCompareToolbar = () => {
    const {isAnyProductToCompareSelected,initializeProductComparisonList} = CompareFunctions();
    const {addListenerDispatchOnCompareUpdate,removeListenerDispatchOnCompareUpdate} = CustomEventsControler();
    const [isProductCompareToolbarVisible, setIsProductCompareToolbarVisible] = useState(false);
    const {openComparepage} = NavigateFunctions();

    initializeProductComparisonList();

    const handleCompareStorageChange = () => {
        console.log("Event: CompareStorage has been updated");
        setIsProductCompareToolbarVisible(isAnyProductToCompareSelected())
    }

    useEffect(() => {
        addListenerDispatchOnCompareUpdate(handleCompareStorageChange);
        handleCompareStorageChange();

        return () => { //kiedy komponent przestaje dzialac usuwany jest listener
            removeListenerDispatchOnCompareUpdate(handleCompareStorageChange);
        }
    }, []); //Pozbycie się ", []" usuwa warning ale w konsoli pokazane jest jakby dwukrotnie wywołana była ta funkcja. tak czy inaczej działa

    const handleClick = () => {
        openComparepage();
    };

    return (
        <div className={styles.toolbarContainer}>
            <a id="CompareImg">
                {isProductCompareToolbarVisible ? (
                    <div className={styles.toolbarVisible} onClick={handleClick}>
                        <p className={styles.compareButton}>Compare is visible</p>
                    </div>
                ) : (
                    <div>
                        {/*<p>Compare is NOT visible</p>*/}
                    </div>
                )}
                {/*<img src="CompareLogoImg.jpg" alt="CompareLogoImg.jpg" id="CompareLogoImg2"/>*/}
            </a>
        </div>
    );
};

export default ProductCompareToolbar;


