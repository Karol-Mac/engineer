import {CompareFunctions} from "../functions/CompareFunctions";
const AddCompareButton = (givenProductID) => {
    const {toggleProductInComparisonList} = CompareFunctions();

    return(
        <a href="" onClick={toggleProductInComparisonList(givenProductID)} id="CompareImg">
            <img src="CompareLogoImg.jpg" alt="CompareLogoImg.jpg" id="CompareLogoImg2"/>
        </a>
    );
};

export default AddCompareButton;

