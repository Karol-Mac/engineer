import {CompareFunctions} from "../functions/CompareFunctions";
import {CustomEventsControler} from "../functions/CustomEventsControler";

const CompareProductsButton = (givenProductID) => {
    const {toggleProductInComparisonList} = CompareFunctions();
    const {dispatchOnCompareUpdate} = CustomEventsControler();

    const handleCompareImgClick = () => {
        toggleProductInComparisonList(givenProductID);
        dispatchOnCompareUpdate();
    }

    return(

        <a href="" onClick={handleCompareImgClick} id="CompareImg">
            <img src="CompareLogoImg.jpg" alt="CompareLogoImg.jpg" id="CompareLogoImg2"/>
        </a>
    );
};

export default CompareProductsButton;

