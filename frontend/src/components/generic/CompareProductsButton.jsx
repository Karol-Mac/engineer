import {CompareFunctions} from "../functions/CompareFunctions";
import {CustomEventsControler} from "../functions/CustomEventsControler";
import {useState} from "react";

const CompareProductsButton = ({givenProductID}) => {
    const {toggleProductInComparisonList,isSpecificProductToCompareSelected} = CompareFunctions();
    const {invokeOnCompareUpdateEvent} = CustomEventsControler();

    // console.log("giventProductID as prop "+givenProductID+ " is type"+ typeof givenProductID);
    const [productSelectedToCompare, setProductSelectedToCompare] = useState(isSpecificProductToCompareSelected(givenProductID));
    //zaznaczenie produktu w menu głównym przeniesie sie do wyszukiwarki

    const handleClick = () => {
        console.log("givenProductID is "+givenProductID);
        toggleProductInComparisonList(givenProductID);
        invokeOnCompareUpdateEvent();
        setProductSelectedToCompare(isSpecificProductToCompareSelected(givenProductID));
    }

    return(
        <div onClick={handleClick} id="CompareImg">
            {productSelectedToCompare ? (
                <>
                    <img src="CompareLogoImg.jpg" alt="CompareLogoImg.jpg" id="CompareLogoImg2"/> {/* Ustawic przekreslona wage (produkt jest juz porownywany */}
                </>
            ) : (
                <>
                <img src="CompareLogoImg.jpg" alt="CompareLogoImg.jpg" id="CompareLogoImg2"/> {/* Ustawic normalną wage (produkt NIE jest porownywany */}
                </>
            )}
        </div>
    );
};

export default CompareProductsButton;

