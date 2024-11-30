import { useEffect, useState } from "react";
import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import CompareProductElement from "../components/specific/comparepage/CompareProductElement";
import { SearchProductFunctions } from "../components/functions/SearchProductFunctions";
import { SellerAccountFunctions } from "../components/functions/SellerAccountFunctions";
import { ImagesFunctions } from "../components/functions/ImagesFunctions";
import { CustomEventsControler } from "../components/functions/CustomEventsControler";
import styles from "../css/CompareProductpage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CompareProductpage = () => {
    const { getProductInformation } = SearchProductFunctions();
    const { addListenerDispatchOnCompareUpdate, removeListenerDispatchOnCompareUpdate } = CustomEventsControler();
    const { getSellerInformation } = SellerAccountFunctions();
    const { getImageByName } = ImagesFunctions();

    const [productComparisonDetails, setProductComparisonDetails] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState("");
    const [direction, setDirection] = useState("asc");
    const [filters, setFilters] = useState([]);
    const [filterValues, setFilterValues] = useState({});
    const [availableFilters, setAvailableFilters] = useState([
        "price",
        "salt",
        "fat",
        "protein",
        "carbs",
        "fiber",
        "weight",
    ]);

    const clearComparison = () => {
        localStorage.setItem("compareProductList", JSON.stringify([]));
        setProductComparisonDetails([]);
        setFilteredProducts([]);
    };

    useEffect(() => {
        const fetchAllProductDetails = async () => {
            let CompareProducts = JSON.parse(localStorage.getItem("compareProductList")) || [];
            CompareProducts = CompareProducts.filter(productID => productID !== null);
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

    const applySorting = () => {
        let sortedProducts = [...filteredProducts];
        if (sortBy) {
            sortedProducts.sort((a, b) => {
                if (direction === "asc") return a[sortBy] - b[sortBy];
                else return b[sortBy] - a[sortBy];
            });
        }
        setFilteredProducts(sortedProducts);
    };

    const applyFiltering = () => {
        let filtered = [...productComparisonDetails];
        filters.forEach((filter) => {
            const min = filterValues[`${filter}_min`] || 0;
            const max = filterValues[`${filter}_max`] || Infinity;
            filtered = filtered.filter(
                (product) => product[filter] >= min && product[filter] <= max
            );
        });
        setFilteredProducts(filtered);
    };

    const handleAddFilter = (filter) => {
        if (!filters.includes(filter)) {
            setFilters([...filters, filter]);
        }
    };

    const handleFilterChange = (filter, type, value) => {
        if (value.match(/^[0-9]*$/)) {
            setFilterValues((prev) => ({
                ...prev,
                [`${filter}_${type}`]: Math.max(0, Number(value)), // Zapobiega wartościom ujemnym
            }));
        }
    };

    const handleInput = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
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
                        <h1 className={styles.pageTitle}>Compare what you like!</h1>
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
                    <>
                        <div className={styles.sortContainer}>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="">Select Sort By</option>
                                <option value="price">Price</option>
                                <option value="pricePer100g">Price per 100 g</option>
                                <option value="weight">Weight</option>
                                <option value="energeticValue">Energetic Value</option>
                                <option value="carbs">Carbs</option>
                                <option value="fat">Fat</option>
                                <option value="protein">Protein</option>
                                <option value="fiber">Fiber</option>
                                <option value="salt">Salt</option>
                            </select>
                            <select value={direction} onChange={(e) => setDirection(e.target.value)}>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                            <button onClick={applySorting}>Apply Sort</button>
                        </div>
                        <div className={styles.filters}>
                            <select onChange={(e) => handleAddFilter(e.target.value)}>
                                <option value="">Add Filter</option>
                                {availableFilters.map((filter) => (
                                    <option key={filter} value={filter}>
                                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {filters.map((filter) => (
                                <div key={filter} className={styles.filterRow}>
                                    <label>{filter.charAt(0).toUpperCase() + filter.slice(1)}</label>
                                    <input
                                        type="text" // Zmienione z "number" na "text"
                                        placeholder="Min"
                                        className={styles.inputField}
                                        onInput={handleInput} // Dodane onInput
                                        onChange={(e) => handleFilterChange(filter, "min", e.target.value)}
                                    />
                                    <input
                                        type="text" // Zmienione z "number" na "text"
                                        placeholder="Max"
                                        className={styles.inputField}
                                        onInput={handleInput} // Dodane onInput
                                        onChange={(e) => handleFilterChange(filter, "max", e.target.value)}
                                    />
                                </div>
                            ))}
                            <button onClick={applyFiltering} className={styles.applyButton}>
                                Apply Filters
                            </button>
                        </div>
                    </>
                )}

                {filteredProducts.length > 0 && (
                    <div className={styles.contentContainer}>
                        <div id="comparedProducts" className={styles.productContainer}>
                            {filteredProducts.map((product) => (
                                <div key={product.id} className={styles.productItem}>
                                    <CompareProductElement compareProductData={product} styles={styles}/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
            <Footer/>
        </div>
    );
};

export default CompareProductpage;
