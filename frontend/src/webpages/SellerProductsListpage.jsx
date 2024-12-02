import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {QueryParamsFunctions} from "../components/functions/QueryParamsFunctions";
import LoadingOverlay from "../components/specific/overlays/LoadingOverlay";
import {SellerAccountFunctions} from "../components/functions/SellerAccountFunctions";
import {ImagesFunctions} from "../components/functions/ImagesFunctions";
import styles from "../css/SellerProductsListpage.module.css";
import SellerProductElement from "../components/specific/sellerProductListpage/SellerProductElement";
import SellerProductsSearchbar from "../components/specific/sellerProductListpage/SellerProductsSearchbar";


const SellerProductsListpage = () => {
    const {getSearchedProductName} = QueryParamsFunctions();
    const{getSellerInformation, getSellerProducts} = SellerAccountFunctions();
    const{getImageByName} = ImagesFunctions()

    let [searchParams, setSearchParams] = useSearchParams();
    const[sellerName , setSellerName] = useState("");
    const[sellerImage , setSellerImage] = useState();
    const[searchedProduct , setSearchedProduct] = useState("");
    let [foundProducts, setFoundProducts] = useState(null);
    let [filteredProducts, setFilteredProducts] = useState(null);
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
                    if (result.success) {
                        const updatedProductsDetails = await Promise.all(

                            result.foundProducts.map(async (product) => {
                                const [sellerResult, productImageResult] = await Promise.all([
                                    getSellerInformation({ sellerID: product.sellerId }),
                                    getImageByName({ imageName: product.imageName }),
                                ]);



                                if (productImageResult.success) {
                                    product.productImage = productImageResult.image;
                                } else {
                                    console.log(productImageResult.message);
                                }

                                if (sellerResult.success) {
                                    setSellerName(sellerResult.sellerDetails.shopName);
                                    const sellerImageResults = await getImageByName({ imageName: sellerResult.sellerDetails.imageName });

                                    if (sellerImageResults.success) {
                                        setSellerImage(sellerImageResults.image);
                                        product.sellerImage = sellerImageResults.image;
                                    }
                                }

                                return product;
                            })
                        );

                        setFoundProducts(updatedProductsDetails);
                        setFilteredProducts(updatedProductsDetails);
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

    const filtreProducts = (searchedPhrase) => {
        // const filtered = foundProducts.contains(containPhrase);
        const filtered = foundProducts.filter(product => product.name.includes(searchedPhrase));
        setFilteredProducts(filtered);
    }


    return (
        <div>
            <Header/>
        <div className={styles.pageContainer}>
            {!isLoading && (
                <div className={styles.header}>

                    <div className={styles.sellerInfo}>
                        <img src={sellerImage}/>
                        <h1>{sellerName} Products:</h1>
                    </div>
                    <div>
                        <SellerProductsSearchbar styles={styles} onSearch={filtreProducts}/>
                    </div>
                    <div id="foundProducts" className={styles.productList}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => {
                                const productData = {
                                    productID: product.id,
                                    productName: product.name,
                                    productImageName: product.productImage,
                                    productPrice: product.price,
                                    sellerID: product.sellerId,
                                    sellerImageName: product.sellerImage,
                                    productWeight: `${product.weight} ${product.inGrams ? "g" : "ml"}`,

                                };
                                return (
                                    <div key={product.id} className={styles.productItem}>
                                        <SellerProductElement productData={productData} styles={styles} />
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