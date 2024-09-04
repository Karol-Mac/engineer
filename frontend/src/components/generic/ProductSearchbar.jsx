import {CompareFunctions} from "../functions/CompareFunctions";
import {useState} from "react";
import {CustomEventsControler} from "../functions/CustomEventsControler";
import {NavigateFunctions} from "../functions/NavigateFunctions";

const ProductSearchbar = ({SearchbarID}) => {
    const {openSearchpage} = NavigateFunctions();

    const [searchedProductName, setSearchedProductName] = useState({ searchedProductName: "", password: "" });

    const handleClick = () =>{
        openSearchpage(searchedProductName)
    };

    const handleChange = ({ currentTarget: input }) => {
        setSearchedProductName({ ...searchedProductName, [input.name]: input.value });
    };

    return(
        <div id={SearchbarID}>
            <input type="text"
                   className="Searchbar"
                   id="homepageSearchBar"
                   placeholder="Search.."
                   onChange={handleChange}/>

            <button onClick={handleClick} id="CompareImg">
                <img src="CompareLogoImg.jpg" alt="CompareLogoImg" id="CompareLogoImg2" />
            </button>
        </div>
    );
};

export default ProductSearchbar;

