import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import {useState} from "react";
import ProductCompareToolbar from "../components/generic/ProductCompareToolbar";
import {NavigateFunctions} from "../components/functions/NavigateFunctions";

const Homepage = () => {

    const [homepageImages, setHomepageImages] = useState(null);
    const {} = NavigateFunctions();
    const handleClick = () =>{

    };

    return (
        <div>
            <Header/>
            <h1>Site title</h1>
            <input type="text" className="Searchbar" id="homepageSearchBar" placeholder="Search.."/>
            <button onClick={handleClick} id="CompareImg">
                <img src="CompareLogoImg.jpg" alt="CompareLogoImg" id="CompareLogoImg2" />
            </button>
            <ProductCompareToolbar/>
            <Footer/>
        </div>

    );

};

export default Homepage;