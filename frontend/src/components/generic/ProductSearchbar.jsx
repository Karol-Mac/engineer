import {CompareFunctions} from "../functions/CompareFunctions";
import {useState} from "react";
import {CustomEventsControler} from "../functions/CustomEventsControler";
import {NavigateFunctions} from "../functions/NavigateFunctions";
import { FaSearch } from 'react-icons/fa';

const ProductSearchbar = ({onSearch, styles}) => {
    const {openSearchpage} = NavigateFunctions();

    const [searchName, setSearchName] = useState("");

    const handleSearchClick = () =>{
        if(onSearch){
            onSearch(searchName);
        }else{
            const searchedProductName = {name: searchName}
            console.log("Open Searchpage with search: "+searchedProductName);
            openSearchpage(searchedProductName);
        }
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

