import {useState} from "react";
import { FaSearch } from 'react-icons/fa';

const SellerProductsSearchbar = ({styles, onSearch}) => {

    const [searchName, setSearchName] = useState("");

    const handleFilterSellerProducts = () =>{
        onSearch(searchName);
    };

    const handleFilterChange = (e) => {
        setSearchName(e.target.value);
        if(e.target.value === "") {
            onSearch("");
        }
    };

    return(
        <div className={styles.searchbarContainer}>
            <input type="text"
                   className={styles.searchbarInput}
                   placeholder="Search..."
                   onChange={handleFilterChange}/>

            <button onClick={handleFilterSellerProducts} className={styles.searchbarButton}>
                <FaSearch className={styles.searchbarButtonIcon} />
            </button>
        </div>
    );
};

export default SellerProductsSearchbar;

