import {CompareFunctions} from "../functions/CompareFunctions";
import {useEffect, useState} from "react";

const ProductCompareToolbar = () => {
    const {toggleProductInComparisonList, isProductToCompareSelected } = CompareFunctions();
    const [isProductCompareToolbarVisible, setIsProductCompareToolbarVisible] = useState(false);


    const handleCompareStorageChange = () => {
        setIsProductCompareToolbarVisible(isProductToCompareSelected())
    }

    useEffect(() => {
        window.addEventListener("onCompareUpdate", handleCompareStorageChange);
        handleCompareStorageChange();
    }, []);


    return(
        <div>
        // <a href="" onClick={toggleProductInComparisonList()} id="CompareImg">
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

