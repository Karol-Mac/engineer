import React from "react";
import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { QueryParamsFunctions } from "../components/functions/QueryParamsFunctions";
import { SearchProductFunctions } from "../components/functions/SearchProductFunctions";
import SearchProductElement from "../components/specific/searchpage/SearchProductElement";
import LoadingOverlay from "../components/specific/overlays/LoadingOverlay";
import { SellerAccountFunctions } from "../components/functions/SellerAccountFunctions";
import { ImagesFunctions } from "../components/functions/ImagesFunctions";
import { SortFilterFunctions } from "../components/functions/SortFilterFunctions";
import SortFilterSection from "../components/specific/comparepage/SortFilterSection";
import styles from "../css/Searchpage.module.css";
import BatchSizeButton from "../components/specific/searchpage/BatchSizeButton";
import PageButton from "../components/specific/searchpage/PageButton";

const Searchpage = () => {
    const { getSearchedProductName } = QueryParamsFunctions();
    const { getSearchedProducts, setBatchSize, getBatchSize, getCurrentBatchSize, getPagesNumber,
            setPageNumber, getCurrentPage, setCurrentPageNumer, countSearchedProducts } = SearchProductFunctions();
    const { getSellerInformation } = SellerAccountFunctions();
    const { getImageByName } = ImagesFunctions();
    const {
        sortBy,
        setSortBy,
        direction,
        setDirection,
        filters,
        availableFilters,
        filterValues,
        handleAddFilter,
        handleRemoveFilter,
        handleFilterChange,
        applySorting,
        applyFiltering,
    } = SortFilterFunctions();

    const BATCHSIZE = getBatchSize();
    let [searchParams, setSearchParams] = useSearchParams();
    const [searchedProduct, setSearchedProduct] = useState("");
    const [foundProducts, setFoundProducts] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentBatchSize, setCurrentBatchSizeState] = useState(getCurrentBatchSize());
    const [currentProductCount, setCurrentProductCount] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        const paramSearchString = getSearchedProductName(searchParams);
        setSearchedProduct(paramSearchString);
        const handleFoundProducts = async () => {
            const productCountRes = await countSearchedProducts({ productName: searchedProduct });
            if (productCountRes.success) {
                console.log("Product count:", productCountRes.productCount);
                setCurrentProductCount(productCountRes.productCount);
            }

            await getSearchedProducts({ productName: searchedProduct, pageBatch: currentBatchSize, selectedPage: getCurrentPage()-1}).then(async (result) => {
                if (result.success) {
                    if (!searchedProduct && paramSearchString !== searchedProduct) return;
                    const updatedProductsDetails = await Promise.all(
                        result.foundProducts.products.map(async (product) => {
                            const [sellerResult, productImageResult] = await Promise.all([
                                getSellerInformation({ sellerID: product.sellerId }),
                                getImageByName({ imageName: product.imageName }),
                            ]);

                            if (productImageResult.success) {
                                product.productImage = productImageResult.image;
                            }
                            if (sellerResult.success) {
                                const sellerImageResults = await getImageByName({
                                    imageName: sellerResult.sellerDetails.imageName,
                                });
                                if (sellerImageResults.success) {
                                    product.sellerImage = sellerImageResults.image;
                                }
                            }

                            return product;
                        })
                    );

                    setFoundProducts(updatedProductsDetails);
                    setFilteredProducts(updatedProductsDetails); // Initialize with full product list
                }
                setIsLoading(false);
            });
        };

        handleFoundProducts();
    }, [searchedProduct, searchParams, currentBatchSize]);

    useEffect(() => {
        handleApplySortAndFilter();
    }, [filterValues, sortBy, direction, filters]);

    useEffect(() => {
        displayPageNumbers();
    }, [currentBatchSize, getPagesNumber, getCurrentPage]); // Add dependencies


    const handleApplySortAndFilter = () => {
        if (!foundProducts) return;

        let updatedProducts = applyFiltering(foundProducts);
        updatedProducts = applySorting(updatedProducts);
        setFilteredProducts(updatedProducts);
    };

    const displayedProducts = () => {
        return filteredProducts.slice(
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

    const displayPageNumbers = React.useCallback(() => {
        const totalPages = getPagesNumber();
        const currentPage = getCurrentPage();

        if (totalPages > 0) {
            const pageButtons = [];
            console.log("displayPageNumbers: Total pages: ", totalPages, "Current page: ", currentPage);

            if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) {
                    pageButtons.push(
                        <PageButton key={i} pageNumber={i} onClick={handlePageChange} />
                    );
                }
            } else {
                // Always include the first page button
                pageButtons.push(
                    <PageButton key={1} pageNumber={1} onClick={handlePageChange} />
                );

                if (currentPage <= 2) {
                    for (let i = 2; i <= 4; i++) {
                        pageButtons.push(
                            <PageButton key={i} pageNumber={i} onClick={handlePageChange} />
                        );
                    }

                } else if (currentPage > totalPages - 3) {
                    for (let i = totalPages - 3; i < totalPages; i++) {
                        pageButtons.push(
                            <PageButton key={i} pageNumber={i} onClick={handlePageChange} />
                        );
                    }

                } else {
                    pageButtons.push(
                        <PageButton key={currentPage} pageNumber={currentPage} onClick={handlePageChange} />
                    );
                    pageButtons.push(
                        <PageButton key={currentPage+1} pageNumber={currentPage + 1 } onClick={handlePageChange} />
                    );
                    pageButtons.push(
                        <PageButton key={currentPage + 2} pageNumber={currentPage + 2} onClick={handlePageChange} />
                    );

                }
                pageButtons.push(
                    <PageButton key={totalPages} pageNumber={totalPages} onClick={handlePageChange} />
                );
            }

            setPageNumbers((prev) => {
                if (JSON.stringify(prev) !== JSON.stringify(pageButtons)) {
                    return pageButtons;
                }
                return prev;
            });
        }
        console.log("Page numbers: ", pageNumbers, " totalPages: ", totalPages, " current page: ", currentPage);
    }, [getPagesNumber, getCurrentPage, handlePageChange]);


    useEffect(() => {
        if(currentProductCount != null && currentBatchSize != null){
            const calculatedPageNumber = Math.ceil(currentProductCount / currentBatchSize);
            console.log("Calculated page number: ", calculatedPageNumber, "calculated product count: ", currentProductCount, "current batch size: ", currentBatchSize);
            setPageNumber(calculatedPageNumber);
        }
    }, [currentBatchSize, getPagesNumber, currentProductCount]);

    if (foundProducts == null) {
        return (
            <div>
                <Header />
                <LoadingOverlay />
                <Footer />
            </div>
        );
    }

    return (
        <div>
            {!isLoading && (
                <div>
                    <Header />
                    <h1>Search Results for: {searchedProduct || "All Products"}</h1>
                    <SortFilterSection
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        direction={direction}
                        setDirection={setDirection}
                        filters={filters}
                        availableFilters={availableFilters}
                        filterValues={filterValues}
                        handleAddFilter={handleAddFilter}
                        handleRemoveFilter={handleRemoveFilter}
                        handleFilterChange={handleFilterChange}
                        onApplySortAndFilter={handleApplySortAndFilter}
                    />
                    <div id="foundProducts" className={styles.foundProducts}>
                        {displayedProducts().length > 0 ? (
                            displayedProducts().map((product) => {
                                const productData = {
                                    productID: product.id,
                                    productName: product.name,
                                    productImageName: product.productImage,
                                    productPrice: parseFloat(product.price).toFixed(2),
                                    sellerID: product.sellerId,
                                    sellerImageName: product.sellerImage,
                                    productWeight: `${product.weight} ${product.inGrams ? "g" : "ml"}`,
                                };
                                return (
                                    <div key={product.id} className={styles.productContainer}>
                                        <SearchProductElement productData={productData} styles={styles} />
                                    </div>
                                );
                            })
                        ) : (
                            <div id="foundProducts">
                                <p>No products found</p>
                            </div>
                        )}
                    </div>
                    <div style={{ textAlign: "center", margin: "20px 0" }}>
                        <div style={{ display: "flex", justifyContent: "center", gap: "50px", alignItems: "center" }}>
                            <div>
                                <p>How many products do you want to display?</p>
                                <div className={styles.batchSizeButtons}>
                                    <BatchSizeButton batchsize={BATCHSIZE.TEN} currentBatchSize={currentBatchSize} onClick={handleBatchSizeChange} />
                                    <BatchSizeButton batchsize={BATCHSIZE.FIFTEEN} currentBatchSize={currentBatchSize} onClick={handleBatchSizeChange} />
                                    <BatchSizeButton batchsize={BATCHSIZE.TWENTY} currentBatchSize={currentBatchSize} onClick={handleBatchSizeChange} />
                                </div>
                            </div>
                            <div>{pageNumbers}</div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default Searchpage;
