import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {QueryParamsFunctions} from "../components/functions/QueryParamsFunctions";
import {SearchProductFunctions} from "../components/functions/SearchProductFunctions";
import {ReportFunctions} from "../components/functions/ReportFunctions";
import SearchProductElement from "../components/specific/searchpage/SearchProductElement";

const Searchpage = () => {
    const {getSearchedProductName} = QueryParamsFunctions();
    const {getSearchedProducts} = SearchProductFunctions();

    let [searchParams, setSearchParams] = useSearchParams();
    const[searchedProduct , setSearchedProduct] = useState("");
    useEffect(() => {
        setSearchedProduct(getSearchedProductName(searchParams));
        // console.log("Searched product name : "+getSearchedProductName(searchParams));
    }, []);

    let [foundProducts, setFoundProducts] = useState(null);
    const handleFoundProducts = async () =>{
        // console.log("Looking for "+searchedProduct);
        const result = await getSearchedProducts({productName: searchedProduct});

        if (result.success) {
            setFoundProducts(result.foundProducts);
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
            <div id="foundProducts">
                {foundProducts && foundProducts.length > 0 ? (
                    foundProducts.map((product) => {
                        const productData = {
                            productID: product.id,
                            productName: product.name,
                            productImageName: product.imageName,
                            productPrice: product.price,
                            sellerID: product.sellerId,
                        };
                    return (
                        //div-s are temprorary so that i can make more space between found elements
                        <div key={product.id}>
                        <SearchProductElement productData={productData}/>
                        <br/>
                        <br/>
                        </div>
                    );
                })) : (
                    <div id="foundProducts">
                        <p>no products found</p>
                    </div>
                )};
            </div>
            <Footer/>
        </div>

    );

};

export default Searchpage;