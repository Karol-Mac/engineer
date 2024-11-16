import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {QueryParamsFunctions} from "../components/functions/QueryParamsFunctions";
import {SearchProductFunctions} from "../components/functions/SearchProductFunctions";
import {ReportFunctions} from "../components/functions/ReportFunctions";
import SearchProductElement from "../components/specific/searchpage/SearchProductElement";
import LoadingOverlay from "../components/specific/overlays/LoadingOverlay";
import {SellerAccountFunctions} from "../components/functions/SellerAccountFunctions";
import {ImagesFunctions} from "../components/functions/ImagesFunctions";

const SellerProductsListpage = () => {
    const {getSearchedProductName} = QueryParamsFunctions();
    const{getSellerInformation, getSellerProducts} = SellerAccountFunctions();
    const{getImageByName} = ImagesFunctions()

    let [searchParams, setSearchParams] = useSearchParams();
    const[searchedProduct , setSearchedProduct] = useState("");
    let [foundProducts, setFoundProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setSearchedProduct(getSearchedProductName(searchParams));
    },[searchParams]);

    useEffect(() => {
        // console.log("Searched product name : "+getSearchedProductName(searchParams));

        const handleFoundProducts = async () =>{
            // console.log("Looking for "+searchedProduct);
            await getSellerProducts().then(
                async (result)=> {
                    if (result.success) {
                        const updatedProductsDetails = await Promise.all(
                            result.foundProducts.map(async (product) => {

                                const [sellerResult, productImageResult] = await Promise.all([
                                    getSellerInformation({sellerID: product.sellerId}),
                                    getImageByName({imageName: product.imageName}),
                                ])

                                if (productImageResult.success) {
                                    product.productImage = productImageResult.image;
                                }else{
                                    console.log(productImageResult.message);
                                }

                                if (sellerResult.success) {
                                    const sellerImageResults = await getImageByName({imageName: sellerResult.sellerDetails.imageName});
                                    if (sellerImageResults.success) {
                                        product.sellerImage = sellerImageResults.image;
                                    }
                                }

                                return product;
                            }));

                        setFoundProducts(updatedProductsDetails);
                        console.log("Products:", result.foundProducts);
                    } else {
                        console.log("Error fetching products:", result.message);
                    }

                    setIsLoading(false);
                }
            )
        }

        handleFoundProducts();
    }, [searchedProduct]);



    if(foundProducts == null){
        return <div>
            <Header/>
            <LoadingOverlay/>
            <Footer/>
        </div>;
    }

    return (
        <div>
            {!isLoading && (
                <div>
                    <Header/>
                    <h1>Temp found product with name {searchedProduct}</h1>
                    <div id="foundProducts">
                        {foundProducts.length > 0 ? (
                            foundProducts.map((product) => {
                                const productData = {
                                    productID: product.id,
                                    productName: product.name,
                                    productImageName: product.productImage,
                                    productPrice: product.price,
                                    sellerID: product.sellerId,
                                    sellerImageName: product.sellerImage,

                                };
                                return (
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
            )}
        </div>

    );

};

export default SellerProductsListpage;