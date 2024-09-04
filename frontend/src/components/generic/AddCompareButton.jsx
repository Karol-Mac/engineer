import { CompareFunctions } from "../functions/CompareFunctions";

const AddCompareButton = (givenProductID) => {
    const { toggleProductInComparisonList } = CompareFunctions();

    const handleClick = () => {
        toggleProductInComparisonList(givenProductID);
    };

    return (
        // <button onClick={handleClick} id="CompareImg">
        //     <img src="CompareLogoImg.jpg" alt="CompareLogoImg" id="CompareLogoImg2" />
        // </button>

        // <span onClick={handleClick} id="CompareImg">
        //     <img src="CompareLogoImg.jpg" alt="CompareLogoImg" id="CompareLogoImg2" />
        // </span>

        <div onClick={handleClick} id="CompareImg">
            <img src="CompareLogoImg.jpg" alt="CompareLogoImg" id="CompareLogoImg2" />
        </div>


    );
};

export default AddCompareButton;
