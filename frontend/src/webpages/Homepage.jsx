import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import {useState} from "react";
import ProductCompareToolbar from "../components/generic/ProductCompareToolbar";

const Homepage = () => {

    const [homepageImages, setHomepageImages] = useState(null);

    return (
        <div>
            <Header/>
            <h1>Site title</h1>
            <input type="text" className="Searchbar" id="homepageSearchBar" placeholder="Search.."/>

            <ProductCompareToolbar/>
            <Footer/>
        </div>

    );

};

export default Homepage;