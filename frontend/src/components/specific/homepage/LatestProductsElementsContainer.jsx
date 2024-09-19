import {useEffect, useState} from "react";
import {SearchProductFunctions} from "../../functions/SearchProductFunctions";
import axios from "axios";
import SearchProductElement from "../searchpage/SearchProductElement";
import {LatestProductsElement} from "./LatestProductsElement";

//{givenProductName, givenPrice} if id
const LatestProductsElementsContainer =() => {
    const {getLatestProducts} = SearchProductFunctions();

    let [foundProducts, setFoundProducts] = useState(null); //array of products

    useEffect(() => {
        const handleFoundProducts = async () =>{
            // console.log("Looking for "+searchedProduct);
            await getLatestProducts().then(
                (result)=>{
                    if (result.success) {
                        setFoundProducts(result.foundProducts);
                        console.log("Products:", result.foundProducts);
                    } else {
                        console.log("Error fetching products:", result.message);
                    }
                }
            )
        }

        handleFoundProducts();
    }, []);

    return (
        <div id="LatestProductsElementsContainer">
            {foundProducts !=null && foundProducts.length > 0 ? (
                foundProducts.map((product) => {
                    const productData = {
                        productID: product.id,
                        productName: product.name,
                        productImageName: product.imageName,
                        productPrice: product.price,
                        productUpdateDate: product.updatedAt,
                        sellerID: product.sellerId,
                    };
                    return (
                        //div-s are temprorary so that I can make more space between found elements
                        <div key={product.id}>
                            <LatestProductsElement latestProductData={productData}/>
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
    );
}

export default LatestProductsElementsContainer;