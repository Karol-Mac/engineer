import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {QueryParamsFunctions} from "../components/functions/QueryParamsFunctions";
import {SearchProductFunctions} from "../components/functions/SearchProductFunctions";

const Searchpage = () => {
    const {getSearchedProductName} = QueryParamsFunctions();
    const {getSearchedProducts} = SearchProductFunctions();

    let [searchParams, setSearchParams] = useSearchParams();
    const[searchedProduct , setSearchedProduct] = useState("");
    useEffect(() => {
        setSearchedProduct(getSearchedProductName(searchParams));
        // console.log("Searched product name : "+getSearchedProductName(searchParams));
    }, []);

    const handleFoundProducts = async () =>{
        // console.log("Looking for "+searchedProduct);
        const result = await getSearchedProducts({productName: searchedProduct});

        if (result.success) {
            console.log("Products:", result.foundProducts);
        } else {
            console.log("Error fetching products:", result.message);
        }
    }


    return (
        <div>
            <Header/>
            <h1>Temp found product with name {searchedProduct}</h1>
            <div onClick={handleFoundProducts}>FIND PRODUCTS</div>
            <Footer/>
        </div>

    );

};

export default Searchpage;