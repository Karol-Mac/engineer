import React, { useEffect, useState } from "react"; // Dodaj brakujące importy
import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import CompareProductElement from "../components/specific/comparepage/CompareProductElement";
import { SearchProductFunctions } from "../components/functions/SearchProductFunctions";
import { SellerAccountFunctions } from "../components/functions/SellerAccountFunctions";
import { ImagesFunctions } from "../components/functions/ImagesFunctions";
import { CustomEventsControler } from "../components/functions/CustomEventsControler";
import { SortFilterFunctions } from "../components/functions/SortFilterFunctions";
import SortFilterSection from "../components/specific/comparepage/SortFilterSection";
import styles from "../css/CompareProductpage.module.css";
import LoadingOverlay from "../components/specific/overlays/LoadingOverlay";

const CompareProductpage = () => {
    const { getProductInformation } = SearchProductFunctions();
    const { addListenerDispatchOnCompareUpdate, removeListenerDispatchOnCompareUpdate } = CustomEventsControler();
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

    const [productComparisonDetails, setProductComparisonDetails] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllProductDetails = async () => {
            let CompareProducts = JSON.parse(localStorage.getItem("compareProductList")) || [];
            CompareProducts = CompareProducts.filter((productID) => productID !== null);
            localStorage.setItem("compareProductList", JSON.stringify(CompareProducts));

            const fetchedComparedProducts = await Promise.all(
                CompareProducts.map(async (comparedProductID) => {
                    const result = await getProductInformation({ productID: comparedProductID });
                    if (result.success) {
                        const product = result.productDetails;

                        const [sellerResult, productImageResult] = await Promise.all([
                            getSellerInformation({ sellerID: product.sellerId }),
                            getImageByName({ imageName: product.imageName }),
                        ]);

                        product.pricePer100g = (product.price / product.weight) * 100;

                        if (productImageResult.success) {
                            product.productImageName = productImageResult.image;
                        }

                        if (sellerResult.success) {
                            const sellerImageResults = await getImageByName({
                                imageName: sellerResult.sellerDetails.imageName,
                            });
                            if (sellerImageResults.success) {
                                product.sellerImageName = sellerImageResults.image;
                            }
                        }

                        return product;
                    }
                    return null;
                })
            );

            const validProducts = fetchedComparedProducts.filter((product) => product !== null);
            setProductComparisonDetails(validProducts);
            setFilteredProducts(validProducts);
            setIsLoading(false);
        };

        fetchAllProductDetails();
        return () => {
            removeListenerDispatchOnCompareUpdate();
        };
    }, []);

    const handleApplySortAndFilter = () => {
        let updatedProducts = applyFiltering(productComparisonDetails);
        updatedProducts = applySorting(updatedProducts);
        setFilteredProducts(updatedProducts);
    };

    if (isLoading) {
        return (
            <div>
                <Header />
                <LoadingOverlay />
                <Footer />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className={`${styles.pageContainer}`}>
                <div className={styles.headerContainer}>
                    <h1 className={styles.pageTitle}>
                        {filteredProducts.length > 0 ? "Compare what you like!" : "No products found"}
                    </h1>
                    <button
                        className={styles.clearButton}
                        onClick={() => {
                            localStorage.setItem("compareProductList", JSON.stringify([]));
                            setProductComparisonDetails([]);
                            setFilteredProducts([]);
                        }}
                    >
                        Clear Comparison
                    </button>
                </div>

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


                {filteredProducts.length > 0 ? (
                    <div className={styles.contentContainer}>
                        <div id="comparedProducts" className={styles.productContainer}>
                            {filteredProducts.map((product) => (
                                <div key={product.id} className={styles.productItem}>
                                    <CompareProductElement compareProductData={product} styles={styles} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No products available! Add a new product or adjust the filters.</p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CompareProductpage;