import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import {useState} from "react";
import ProductCompareToolbar from "../components/generic/ProductCompareToolbar";
import {NavigateFunctions} from "../components/functions/NavigateFunctions";

const Homepage = () => {

    const [homepageImages, setHomepageImages] = useState(null);
    const {openSearchpage} = NavigateFunctions();
    const handleSearchClick = () =>{
        openSearchpage()
    };

    return (
        <div>
            <Header/>
            <h1>Site title</h1>
            <input type="text" className="Searchbar" id="homepageSearchBar" placeholder="Search.."/>
            <button onClick={handleSearchClick} id="CompareImg">
                <span>Search</span>
            </button>
            <ProductCompareToolbar/>
            <Footer/>
        </div>

    );

};

export default Homepage;