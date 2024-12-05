import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import { ReportFunctions } from "../../functions/ReportFunctions";
import FavouriteButton from "../../generic/FavouriteButton";
import { NavigateFunctions } from "../../functions/NavigateFunctions";
import { SearchProductFunctions } from "../../functions/SearchProductFunctions";
import EditProductButton from "../../generic/EditProductButton";
import { LoginFunctions } from "../../functions/LoginFunctions";

function SearchProductElement({ productData, styles }) {
    const { setReportTypeProduct } = ReportFunctions();
    const { openProductpage } = NavigateFunctions();
    const { getSellerData } = SearchProductFunctions();
    const { isAdminUser, isSeller } = LoginFunctions();

    console.log("Productdata: ", productData);

    const [productID, setProductID] = useState(productData.productID);
    const [productName, setProductName] = useState(productData.productName);
    const [productImageName, setProductImageName] = useState(productData.productImageName);
    const [productPrice, setProductPrice] = useState(productData.productPrice);
    const [productWeight, setProductWeight] = useState(productData.productWeight);
    const [productIsGram, setProductIsGram] = useState(productData.inGrams);
    const [sellerID, setSellerID] = useState(parseInt(productData.sellerID, 10));
    const [sellerName, setSellerName] = useState("");
    const [sellerImageName, setSellerImageName] = useState(productData.sellerImageName);

    useEffect(() => {
        const fetchSellerInformation = async () => {
            const result = await getSellerData({ sellerID });
            if (result.success) {
                setSellerName(result.sellerData.shopName);
                // console.log("GetSellerNameSuccess:", result.sellerData.name);
            } else {
                console.log("Error fetching seller information:", result.message);
            }
        };

        fetchSellerInformation();
    }, [sellerID, getSellerData]);

    const clickHandled = useRef(false);

    const handleClick = (e) => {
        if (clickHandled.current) return;
        clickHandled.current = true;

        if (e.target.closest(`.${styles.productActions}`)) {
            clickHandled.current = false;
            return;
        }

        openProductpage({ productID });

        setTimeout(() => {
            clickHandled.current = false;
        }, 0);
    };

    const handleActionClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.productContainer} onClick={(e) => handleClick(e)}>
            <img src={productImageName} alt={productImageName} className={styles.productImage} />
            <div className={styles.productDetails}>
                <h4 className={styles.productName}>{productName}</h4>
                <p className={styles.productPrice}>Price: {parseFloat(productPrice).toFixed(2)} zł</p>
                <p className={styles.productWeight}>Weight: {productWeight}</p>
                <div className={styles.sellerInfo}>
                    <span>{sellerName}</span>
                    <img src={sellerImageName} alt={sellerName} className={styles.sellerImage} />
                </div>
            </div>
            <div className={styles.productActions} onClick={(e) => handleActionClick(e)}>
                <CompareProductsButton givenProductID={productID}/>
                {(!isSeller() && !isAdminUser()) && (
                    <ReportButton reportType="product" givenReportedID={productID}  />
                )}
                <FavouriteButton givenProductID={productID} isInFavourite={productData.isFavourite}  />
                {(isSeller() || isAdminUser()) && (
                    <EditProductButton givenProductID={productID} />
                )}
            </div>
        </div>
    );
}

export default SearchProductElement;