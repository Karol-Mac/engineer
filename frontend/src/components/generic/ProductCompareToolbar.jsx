import {CompareFunctions} from "../functions/CompareFunctions";
import {useEffect, useState} from "react";
import {CustomEventsControler} from "../functions/CustomEventsControler";

const ProductCompareToolbar = () => {
    const {isAnyProductToCompareSelected,initializeProductComparisonList} = CompareFunctions();
    const {addListenerDispatchOnCompareUpdate,removeListenerDispatchOnCompareUpdate} = CustomEventsControler();
    const [isProductCompareToolbarVisible, setIsProductCompareToolbarVisible] = useState(false);

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


    return(
        <div>
        <a id="CompareImg">
        {isProductCompareToolbarVisible ? (
                <div>
                    <p>Compare is visible</p>
                {/*add images of products to compare + button to the webpage*/}
                </div>
            ) : (
                <div>
                    <p>Compare is NOT visible</p>
                </div>
            )}
            {/*<img src="CompareLogoImg.jpg" alt="CompareLogoImg.jpg" id="CompareLogoImg2"/>*/}
        </a>
        </div>
    );
};

export default ProductCompareToolbar;

