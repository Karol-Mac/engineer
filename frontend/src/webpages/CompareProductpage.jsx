import { useEffect, useState } from "react";
import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import CompareProductElement from "../components/specific/comparepage/CompareProductElement";
import { SearchProductFunctions } from "../components/functions/SearchProductFunctions";
import { SellerAccountFunctions } from "../components/functions/SellerAccountFunctions";
import { ImagesFunctions } from "../components/functions/ImagesFunctions";
import { CustomEventsControler } from "../components/functions/CustomEventsControler";
import styles from "../css/CompareProductpage.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrapa

const CompareProductpage = () => {
    const { getProductInformation } = SearchProductFunctions();
    const { addListenerDispatchOnCompareUpdate, removeListenerDispatchOnCompareUpdate } = CustomEventsControler();
    const { getSellerInformation } = SellerAccountFunctions();
    const { getImageByName } = ImagesFunctions();

    let CompareProducts = JSON.parse(localStorage.getItem("compareProductList"));
    CompareProducts = CompareProducts.filter(productID => productID !== null);
    localStorage.setItem("compareProductList", JSON.stringify(CompareProducts));

    const [isLoading, setIsLoading] = useState(true);
    const [productComparisonDetails, setProductComparisonDetails] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState("price");
    const [direction, setDirection] = useState("asc");

    const clearComparison = () => {
        localStorage.setItem("compareProductList", JSON.stringify([]));
        setProductComparisonDetails([]);
    };

    useEffect(() => {
        const fetchAllProductDetails = async () => {
            const fetchedComparedProducts = await Promise.all(
                CompareProducts.map(async (comparedProductID) => {
                    const result = await getProductInformation({ productID: comparedProductID });
                    if (result.success) {
                        const product = result.productDetails;

                        const [sellerResult, productImageResult] = await Promise.all([
                            getSellerInformation({ sellerID: product.sellerId }),
                            getImageByName({ imageName: product.imageName }),
                        ]);

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

            const validProducts = fetchedComparedProducts.filter(product => product !== null);
            setProductComparisonDetails(validProducts);
            setFilteredProducts(validProducts);
            setIsLoading(false);
        };

        fetchAllProductDetails();
        return () => {
            removeListenerDispatchOnCompareUpdate();
        };
    }, []);

    const applyFiltersAndSort = () => {
        let updatedProducts = [...productComparisonDetails];

        // Sortowanie
        updatedProducts.sort((a, b) => {
            if (direction === "asc") {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });

        setFilteredProducts(updatedProducts);
    };

    if (isLoading) {
        return <div><p>LOADING</p></div>;
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className={`${styles.pageContainer}`}>
                {filteredProducts.length > 0 ? (
                    <div className={styles.headerContainer}>
                        <h1 className={styles.pageTitle}>Compare Product with</h1>
                        <button
                            className={styles.clearButton}
                            onClick={clearComparison}
                        >
                            Clear Comparison
                        </button>
                    </div>
                ) : (
                    <h1 className={styles.pageTitle}>No products were selected to be compared</h1>
                )}

                {filteredProducts.length > 0 && (
                    <div className="filters">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="price">Price</option>
                            <option value="salt">Salt</option>
                            <option value="fat">Fat</option>
                            <option value="protein">Protein</option>
                            <option value="carbs">Carbs</option>
                            <option value="fiber">Fiber</option>
                        </select>
                        <select value={direction} onChange={(e) => setDirection(e.target.value)}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        <button onClick={applyFiltersAndSort}>Apply Filters</button>
                    </div>
                )}

                {filteredProducts.length > 0 && (
                    <div className={styles.contentContainer}>
                        <div id="comparedProducts" className={styles.productContainer}>
                            {filteredProducts.map((product) => (
                                <div key={product.id} className={styles.productItem}>
                                    <CompareProductElement compareProductData={product} styles={styles} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CompareProductpage;
