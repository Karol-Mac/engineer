import {CompareFunctions} from "../functions/CompareFunctions";
import {useEffect, useState} from "react";
import {CustomEventsControler} from "../functions/CustomEventsControler";

const ProductCompareToolbar = () => {
    const {toggleProductInComparisonList, isProductToCompareSelected } = CompareFunctions();
    const {addListenerDispatchOnCompareUpdate,removeListenerDispatchOnCompareUpdate} = CustomEventsControler();
    const [isProductCompareToolbarVisible, setIsProductCompareToolbarVisible] = useState(false);


    const handleCompareStorageChange = () => {
        setIsProductCompareToolbarVisible(isProductToCompareSelected())
    }

    useEffect(() => {
        addListenerDispatchOnCompareUpdate(handleCompareStorageChange);
        handleCompareStorageChange();

        return () => { //kiedy komponent przestaje dzialac usuwany jest listener
            removeListenerDispatchOnCompareUpdate(handleCompareStorageChange);
        }
    }, []);


    return(
        <div>
        <a href="" id="CompareImg">
        {isProductCompareToolbarVisible ? (
                <div>
                    <p>Compare is visible</p>
                </div>
            ) : (
                <div>
                    <p>Compare is NOT visible</p>
                </div>
            )}
            <img src="CompareLogoImg.jpg" alt="CompareLogoImg.jpg" id="CompareLogoImg2"/>
        // </a>
        </div>
    );
};

export default ProductCompareToolbar;

