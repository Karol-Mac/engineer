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
import styles from "../css/SellerProductsListpage.module.css";


const SellerProductsListpage = () => {
    const {getSearchedProductName} = QueryParamsFunctions();
    const{getSellerInformation, getSellerProducts} = SellerAccountFunctions();
    const{getImageByName} = ImagesFunctions()

    let [searchParams, setSearchParams] = useSearchParams();
    const[searchedProduct , setSearchedProduct] = useState("");
    let [foundProducts, setFoundProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [loadingError, setLoadingError] = useState(false);

    useEffect(() => {
        setSearchedProduct(getSearchedProductName(searchParams));
    },[searchParams]);

    useEffect(() => {
        // console.log("Searched product name : "+getSearchedProductName(searchParams));
        const handleFoundProducts = async () => {
            await getSellerProducts().then(
                async (result) => {
                    console.log("Test-1");
                    if (result.success) {
                        console.log("Test0");
                        const updatedProductsDetails = await Promise.all(

                            result.foundProducts.map(async (product) => {
                                console.log("Test1");
                                const [sellerResult, productImageResult] = await Promise.all([
                                    getSellerInformation({ sellerID: product.sellerId }),
                                    getImageByName({ imageName: product.imageName }),
                                ]);

                                console.log("Test2");


                                if (productImageResult.success) {
                                    product.productImage = productImageResult.image;
                                } else {
                                    console.log(productImageResult.message);
                                }
                                console.log("Test3");
                                if (sellerResult.success) {const sellerImageResults = await getImageByName({ imageName: sellerResult.sellerDetails.imageName });
                                    if (sellerImageResults.success) {
                                        product.sellerImage = sellerImageResults.image;
                                    }
                                }

                                return product;
                            })
                        );

                        setFoundProducts(updatedProductsDetails);
                        console.log("Products:", result.foundProducts);
                    } else {
                        console.log("Error fetching products:", result.message);
                        if (result.message === "Products not found with id: 404") {
                            setIsEmpty(true);
                        } else {
                            setLoadingError(true);
                        }
                    }

                    setIsLoading(false);
                }
            );
        };

        handleFoundProducts();
    }, [searchedProduct]);



    if(isEmpty === true){
        return <div>
            <Header/>
            <h1 className="text-center text-danger mt-5">No Products to display</h1>
            <Footer/>
        </div>;
    }

    if(loadingError === true){
        return <div>
            <Header/>
            <h1 className="text-center text-danger mt-5">Loading Error contact the administrator</h1>
            <Footer/>
        </div>;
    }

    if(foundProducts == null){
        return <div>
            <Header/>
            <LoadingOverlay/>
            <Footer/>
        </div>;
    }

    return (
        <div>
            <Header/>
        <div className={styles.pageContainer}>
            {!isLoading && (
                <div className={styles.header}>

                    <h1>Seller Products:</h1>
                    <div id="foundProducts" className={styles.productList}>
                        {foundProducts.length > 0 ? (
                            foundProducts.map((product) => {
                                const productData = {
                                    productID: product.id,
                                    productName: product.name,
                                    productImageName: product.productImage,
                                    productPrice: product.price,
                                    sellerID: product.sellerId,
                                    sellerImageName: product.sellerImage,
                                    productWeight: product.weight,

                                };
                                return (
                                    <div key={product.id} className={styles.productItem}>
                                        <SearchProductElement productData={productData} styles={styles} />
                                    </div>
                                );
                            })
                        ) : (
                            <div id="foundProducts" className={styles.productList}>
                                <p>No products found</p>
                            </div>
                        )}
                    </div>


                </div>
            )}

        </div>
    <Footer/></div>
    );

};

export default SellerProductsListpage;