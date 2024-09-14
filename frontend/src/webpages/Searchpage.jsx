import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {QueryParamsFunctions} from "../components/functions/QueryParamsFunctions";

const Searchpage = () => {
    const {getSearchedProductName} = QueryParamsFunctions();

    let [searchParams, setSearchParams] = useSearchParams();
    const[searchedProduct , setSearchedProduct] = useState("");
    useEffect(() => {
        setSearchedProduct(getSearchedProductName(searchParams));
        // console.log("Searched product name : "+getSearchedProductName(searchParams));
    }, []);

    return (
        <div>
            <Header/>
            <h1>Temp {searchedProduct}</h1>
            <Footer/>
        </div>

    );

};

export default Searchpage;