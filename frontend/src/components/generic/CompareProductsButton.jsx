import {CompareFunctions} from "../functions/CompareFunctions";
import {CustomEventsControler} from "../functions/CustomEventsControler";
import {useState} from "react";

const CompareProductsButton = ({givenProductID}) => {
    const {toggleProductInComparisonList,isSpecificProductSelectedToCompare} = CompareFunctions();
    const {invokeOnCompareUpdateEvent} = CustomEventsControler();

    // console.log("giventProductID as prop "+givenProductID+ " is type"+ typeof givenProductID);
    const [productSelectedToCompare, setProductSelectedToCompare] = useState(isSpecificProductSelectedToCompare(givenProductID));
    //zaznaczenie produktu w menu głównym przeniesie sie do wyszukiwarki

    const handleClick = () => {
        console.log("givenProductID is "+givenProductID);
        toggleProductInComparisonList(givenProductID);
        invokeOnCompareUpdateEvent();
        setProductSelectedToCompare(isSpecificProductSelectedToCompare(givenProductID));
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

