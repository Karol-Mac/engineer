import {CompareFunctions} from "../functions/CompareFunctions";
import {CustomEventsControler} from "../functions/CustomEventsControler";
import {useState} from "react";
import {FaWeight, FaWeightHanging} from "react-icons/fa";
import styles from "../../css/CompareProductsButton.module.css";

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
        <div onClick={handleClick} id="CompareImg" className={styles.compareButton}>
            {productSelectedToCompare ? (
                <>
                    <FaWeight size={24} />
                </>
            ) : (
                <>
                    <FaWeightHanging size={24} />
                </>
            )}
        </div>
    );
};

export default CompareProductsButton;

