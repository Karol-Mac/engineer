import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import {useState} from "react";
import ProductCompareToolbar from "../components/generic/ProductCompareToolbar";
import {NavigateFunctions} from "../components/functions/NavigateFunctions";
import {CompareFunctions} from "../components/functions/CompareFunctions";

const Homepage = () => {
    const {initializeProductComparisonList} = CompareFunctions();
    const {openSearchpage} = NavigateFunctions();

    const [homepageImages, setHomepageImages] = useState(null);
    const [searchName, setSearchName] = useState("");

    const handleSearchClick = () =>{
        console.log("Open Searchpage with search: "+searchName);
        openSearchpage(searchName);
    };
    initializeProductComparisonList();
    const handleSearchChange = (e) => {
        setSearchName(e.target.value);
        console.log("seachName updated"+searchName)
    };

    return (
        <div>
            <Header/>
            <h1>Site title</h1>
            <input onChange={handleSearchChange} className="Searchbar" id="homepageSearchBar" placeholder="Search.."/>
            <button onClick={handleSearchClick} id="CompareImg">
                <span>Search</span>
            </button>
            <ProductCompareToolbar/>
            <Footer/>
        </div>

    );

};

export default Homepage;