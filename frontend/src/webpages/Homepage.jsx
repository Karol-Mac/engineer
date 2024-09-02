import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import {useState} from "react";

const Homepage = () => {

    const [homepageImages, setHomepageImages] = useState(null);

    return (
        <div>
            <Header/>
            <h1>Site title</h1>
            <input type="text" className="Searchbar" id="homepageSearchBar" placeholder="Search.."/>

            <Footer/>
        </div>

    );

};

export default Homepage;