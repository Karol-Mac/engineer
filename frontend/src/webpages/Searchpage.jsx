import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {QueryParamsFunctions} from "../components/functions/QueryParamsFunctions";
import {SearchProductFunctions} from "../components/functions/SearchProductFunctions";
import SearchProductElement from "../components/specific/searchpage/SearchProductElement";
import LoadingOverlay from "../components/specific/overlays/LoadingOverlay";
import {SellerAccountFunctions} from "../components/functions/SellerAccountFunctions";
import {ImagesFunctions} from "../components/functions/ImagesFunctions";
import styles from "../css/Searchpage.module.css";
import BatchSizeButton from "../components/specific/searchpage/BatchSizeButton";
import PageButton from "../components/specific/searchpage/PageButton";

const Searchpage = () => {
    const {getSearchedProductName} = QueryParamsFunctions();
    const {getSearchedProducts,
        setBatchSize,
        getBatchSize,
        getCurrentBatchSize,
        countPageNumber,
        getCurrentPage,
        setCurrentPageNumer,
        getPagesNumber} = SearchProductFunctions();
    const{getSellerInformation} = SellerAccountFunctions();
    const{getImageByName} = ImagesFunctions()

    const BATCHSIZE = getBatchSize();

    let [searchParams, setSearchParams] = useSearchParams();
    const[searchedProduct , setSearchedProduct] = useState("");
    let [foundProducts, setFoundProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [foundProductsNumber, setFoundProductsNumber] = useState(0);
    const [currentBatchSize, setCurrentBatchSizeState] = useState(getCurrentBatchSize());

    useEffect(() => {
        setSearchedProduct(getSearchedProductName(searchParams));
    },[searchParams]);

    useEffect(() => {
        // console.log("Searched product name : "+getSearchedProductName(searchParams));

        const handleFoundProducts = async () =>{
            // console.log("Looking for "+searchedProduct);
            await getSearchedProducts({productName: searchedProduct}).then(
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
                        setFoundProductsNumber(updatedProductsDetails.length);
                        console.log("Products:", result.foundProducts);
                    } else {
                        console.log("Error fetching products:", result.message);
                    }

                    setIsLoading(false);
                }
            )
        }

        handleFoundProducts();
    }, [searchedProduct, currentBatchSize]);

    useEffect(() => {
        if (foundProducts) {
            countPageNumber(foundProducts);
        }
    }, [foundProducts, currentBatchSize]);

    const displayedProducts = () => {
        console.log("Current page: " + getCurrentPage() + " Current batch size: " + getCurrentBatchSize() + " Found products: " + foundProductsNumber);
        return foundProducts.slice(
            (getCurrentPage() - 1) * getCurrentBatchSize(),
            getCurrentPage() * getCurrentBatchSize()
        );
    };

    const handleBatchSizeChange = (newBatchSize) => {
        setBatchSize(newBatchSize);
        setCurrentBatchSizeState(newBatchSize);
        setCurrentPageNumer(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPageNumer(newPage);
    };

    if(foundProducts == null){
        return <div>
            <Header/>
            <LoadingOverlay/>
            <Footer/>
        </div>;
    }

    const displayPageNumbers = () => {
        const totalPages = getPagesNumber(); // Total number of pages
        const currentPage = getCurrentPage();

        console.log("Total pages: " + totalPages + " Current page: " + currentPage);
        if(totalPages != null && totalPages > 0) {
            const pageNumbers = [];
            if(totalPages <= 4) {
                for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(
                        <PageButton key={i} pageNumber={i} onClick={handlePageChange}/>
                    );
                }
            }else{
                pageNumbers.push(
                    <PageButton key={"first"} pageNumber={1} onClick={handlePageChange}/>
                );

                if(totalPages - currentPage <= 1){
                    const numberOfLeftPages = 2 - (totalPages - currentPage);
                    for (let i = totalPages - numberOfLeftPages; i <= numberOfLeftPages; i++) {
                        pageNumbers.push(
                            <PageButton key={i} pageNumber={i} onClick={handlePageChange}/>
                        );
                    }
                }

                for (let i = currentPage; i <= currentPage+2 && i < totalPages;  i++) {
                    pageNumbers.push(
                        <PageButton key={i} pageNumber={i} onClick={handlePageChange}/>
                    );
                }

                pageNumbers.push(
                    <PageButton key={"last"} pageNumber={totalPages} onClick={handlePageChange}/>
                );
            }

            return (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    {pageNumbers}
                </div>
            );
        }else{
            console.log("Page number is less than 1!!!");
        }
    }

    return (
        <div>
            {!isLoading && (
                <div>
                    <Header/>
                    <h1>Temp found product with name: {searchedProduct}</h1>
                    <div id="foundProducts" className={styles.foundProducts}>
                        {displayedProducts().length > 0 ? (
                            displayedProducts().map((product) => {
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

                                <div key={product.id} className={styles.productContainer}>
                                <SearchProductElement productData={productData} styles={styles}/>
                                </div>
                            );
                        })) : (
                            <div id="foundProducts">
                                <p>no products found</p>
                            </div>
                        )}

                        <div style={{ margin: "10px 0", textAlign: "center" }}>
                            <BatchSizeButton batchsize={BATCHSIZE.TEN} onClick={handleBatchSizeChange} />
                            <BatchSizeButton batchsize={BATCHSIZE.FIFTEEN} onClick={handleBatchSizeChange} />
                            <BatchSizeButton batchsize={BATCHSIZE.TWENTY} onClick={handleBatchSizeChange} />
                        </div>

                        {displayPageNumbers()}
                    </div>
                    <Footer/>
                </div>
            )}
        </div>

    );

};

export default Searchpage;