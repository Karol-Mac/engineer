import {useEffect, useState} from "react";
import {SearchProductFunctions} from "../../functions/SearchProductFunctions";
import axios from "axios";
import SearchProductElement from "../searchpage/SearchProductElement";
import {LatestProductsElement} from "./LatestProductsElement";
import {SellerAccountFunctions} from "../../functions/SellerAccountFunctions";
import {ImagesFunctions} from "../../functions/ImagesFunctions";

//{givenProductName, givenPrice} if id
const LatestProductsElementsContainer =({styles}) => {
    const {getLatestProducts} = SearchProductFunctions();
    const {getSellerInformation} = SellerAccountFunctions();
    const {getImageByName} = ImagesFunctions();

    const [isLoading,setIsLoading] = useState(true);
    let [foundProducts, setFoundProducts] = useState(null); //array of products

    useEffect(() => {
        const handleFoundProducts = async () =>{
            // console.log("Looking for "+searchedProduct);
            const result = await getLatestProducts();
            if (result.success) {
                const latestProducts = result.foundProducts;

                // const latestProductsDetails = await Promise.all(

                const latestProductsDetails = await Promise.all(
                    latestProducts.map( async(latestProduct) => {
                        const [sellerResult, productImageResult] = await Promise.all([
                            getSellerInformation({sellerID: latestProduct.sellerId}),
                            getImageByName({imageName: latestProduct.imageName}),
                        ]);

                        if (productImageResult.success) {
                            latestProduct.productImageName = productImageResult.image;
                        }else{
                            console.log(productImageResult.message);
                        }

                        if (sellerResult.success) {
                            const sellerImageResults = await getImageByName({imageName: sellerResult.sellerDetails.imageName});
                            if (sellerImageResults.success) {
                                latestProduct.sellerImageName = sellerImageResults.image;
                            }
                        }
                        console.log("latestProduct: ", latestProduct);

                        return latestProduct;
                    })
                );


                    setFoundProducts(latestProductsDetails);
                    setIsLoading(false);
                    console.log("Products:", result.foundProducts);
                } else {
                    console.log("Error fetching products:", result.message);
                }


        }

        handleFoundProducts();
    }, []);

    if(isLoading == true){
        return <div>
            <p>Loading</p>
        </div>
    }


    console.log("foundProduct Return :",foundProducts)
    return (
        <div className={styles.latestProductsContainer}>
            {foundProducts !=null && foundProducts.length > 0 ? (
                foundProducts.map((product) => {
                    return (
                        //div-s are temprorary so that I can make more space between found elements
                        <div key={product.id}>
                            {console.log("latestProduct data = ",product)}
                            <LatestProductsElement latestProductData={product} styles={styles}/>
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