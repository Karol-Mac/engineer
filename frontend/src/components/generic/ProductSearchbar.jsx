import {CompareFunctions} from "../functions/CompareFunctions";
import {useState} from "react";
import {CustomEventsControler} from "../functions/CustomEventsControler";
import {NavigateFunctions} from "../functions/NavigateFunctions";

const ProductSearchbar = ({SearchbarID}) => {
    const {openSearchpage} = NavigateFunctions();

    const [searchName, setSearchName] = useState("");

    const handleSearchClick = () =>{
        const searchedProductName = {string: searchName}
        console.log("Open Searchpage with search: "+searchedProductName);
        openSearchpage(searchedProductName);
    };

    const handleSearchChange = (e) => {
        setSearchName(e.target.value);
        // console.log("seachName updated"+searchName)
    };

    return(
        <div id="SearchbarID">
            <input type="text"
                   className="Searchbar"
                   id="homepageSearchBar"
                   placeholder="Search.."
                   onChange={handleSearchChange}/>

            <button onClick={handleSearchClick} id="CompareImg">
                <span>Search</span>
            </button>
        </div>
    );
};

export default ProductSearchbar;

