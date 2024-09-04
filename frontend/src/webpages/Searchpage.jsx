import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";

const Searchpage = ({searchedName}) => {

    return (
        <div>
            <Header/>
            <h1>Temp {searchedName}</h1>
            <Footer/>
        </div>

    );

};

export default Searchpage;