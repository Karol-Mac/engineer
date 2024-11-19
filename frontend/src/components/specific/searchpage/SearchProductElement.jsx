import {useEffect, useState} from "react";
import axios from "axios";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import {ReportFunctions} from "../../functions/ReportFunctions";
import FavouriteButton from "../../generic/FavouriteButton";
import {NavigateFunctions} from "../../functions/NavigateFunctions";
import {SearchProductFunctions} from "../../functions/SearchProductFunctions";

function SearchProductElement ({productData, styles}) {
    const {setReportTypeProduct} = ReportFunctions();
    const {openProductpage} = NavigateFunctions();
    const {getSellerData} = SearchProductFunctions();

    console.log("Productdata: ",productData);

    const [productID, setProductID] = useState(productData.productID);
    const [productName, setProductName] = useState(productData.productName);
    const [productImageName, setProductImageName] = useState(productData.productImageName);
    const [productPrice, setProductPrice] = useState(productData.productPrice);
    const [productWeight, setProductWeight] = useState(productData.productWeight);
    const [productIsGram, setProductIsGram] = useState(productData.inGrams);
    const [sellerID, setSellerID] = useState(parseInt(productData.sellerID, 10));
    const [sellerName, setSellerName] = useState("");  //trzeba wziasc nazwe sprzedawcy po id
    const [sellerImageName, setSellerImageName] = useState(productData.sellerImageName);

    console.log("Raw sellerID:", productData.sellerID); // Logs the incoming sellerID
    console.log("Parsed sellerID:", parseInt(productData.sellerID, 10)); // Logs after parsing

    useEffect(() => {
        const fetchSellerInformation = async () => {
            const result = await getSellerData({ sellerID });
            if (result.success) {
                setSellerName(result.sellerData.shopName);
                console.log("GetSellerNameSuccess:", result.sellerData.name);

            } else {
                console.log("Error fetching seller information:", result.message);
            }
        };

        fetchSellerInformation();
    }, [sellerID, getSellerData]);

    const handleClick = () =>{
        openProductpage({productID});
    }

    return (
        <div className={styles.productContainer} onClick={handleClick}>
            <img src={productImageName} alt={productImageName} className={styles.productImage} />
            <div className={styles.productDetails}>
                <h4 className={styles.productName}>{productName}</h4>
                <p className={styles.productPrice}>{productPrice} zł</p>
                <p className={styles.productWeight}>Weight: {productWeight} {productIsGram ? "g" : "ml"}</p>
                <div className={styles.sellerInfo}>
                    <span>{sellerName}</span>
                    <img src={sellerImageName} alt={sellerName} className={styles.sellerImage} />
                </div>
            </div>
            <div className={styles.productActions}>
                <CompareProductsButton givenProductID={productID} />
                <ReportButton reportType="product" givenReportedID={productID} />
                <FavouriteButton givenProductID={productID} isInFavourite={productData.isFavourite} />
            </div>
        </div>
    );


}

export default SearchProductElement;