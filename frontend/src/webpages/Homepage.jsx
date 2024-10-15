import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import {useState} from "react";
import ProductCompareToolbar from "../components/generic/ProductCompareToolbar";
import {NavigateFunctions} from "../components/functions/NavigateFunctions";
import {CompareFunctions} from "../components/functions/CompareFunctions";
import ProductSearchbar from "../components/generic/ProductSearchbar";
import LatestProductsElementsContainer from "../components/specific/homepage/LatestProductsElementsContainer";

import "../css/generalVisuals.css";


const Homepage = () => {
    const {openSearchpage} = NavigateFunctions();

    const [homepageImages, setHomepageImages] = useState(null);
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

    return (
        <div>
            <Header/>
            <h1>Site title</h1>
            <ProductSearchbar/>
            {/*image carousel*/}
            {/* last updated products div (using last updatedProductElement)*/}
            <LatestProductsElementsContainer/>
            {/*Our partners div (using static images in React in frontend/public/images/partners)*/}
            <ProductCompareToolbar/>
            <Footer/>
        </div>

    );

};

export default Homepage;