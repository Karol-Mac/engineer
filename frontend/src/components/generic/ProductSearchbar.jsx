import {CompareFunctions} from "../functions/CompareFunctions";
import {useState} from "react";
import {CustomEventsControler} from "../functions/CustomEventsControler";
import {NavigateFunctions} from "../functions/NavigateFunctions";
import { FaSearch } from 'react-icons/fa';

const ProductSearchbar = ({SearchbarID, styles}) => {
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
        <div className={styles.searchbarContainer}>
            <input type="text"
                   className={styles.searchbarInput}
                   placeholder="Search..."
                   onChange={handleSearchChange}/>

            <button onClick={handleSearchClick} className={styles.searchbarButton}>
                <FaSearch className={styles.searchbarButtonIcon} />
            </button>
        </div>
    );
};

export default ProductSearchbar;

