import {useState} from "react";
import axios from "axios";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import {ReportFunctions} from "../../functions/ReportFunctions";
import FavouriteButton from "../../generic/FavouriteButton";
import {NavigateFunctions} from "../../functions/NavigateFunctions";

function SearchProductElement ({productData, styles}) {
    const {setReportTypeProduct} = ReportFunctions();
    const {openProductpage} = NavigateFunctions();

    console.log("Productdata: ",productData);

    const [productID, setProductID] = useState(productData.productID);
    const [productName, setProductName] = useState(productData.productName);
    const [productImageName, setProductImageName] = useState(productData.productImageName);
    const [productPrice, setProductPrice] = useState(productData.productPrice);
    const [productWeight, setProductWeight] = useState(productData.weight);
    const [productIsGram, setProductIsGram] = useState(productData.inGrams);
    const [sellerID, setSellerID] = useState(productData.SellerID);
    const [sellerName, setSellerName] = useState("");  //trzeba wziasc nazwe sprzedawcy po id
    const [sellerImageName, setSellerImageName] = useState(productData.sellerImageName);

    const handleClick = () =>{
        openProductpage({productID});
    }

    return (
        <div className={styles.productContainer} onClick={handleClick}>
            <img src={productImageName} alt={productImageName} className={styles.productImage} />
            <div className={styles.productDetails}>
                <h3 className={styles.productName}>{productName}</h3>
                <h5 className={styles.productPrice}>{productPrice}</h5>
                <h5 className={styles.productWeight}>Weight: {productWeight} {productIsGram ? "g" : "ml"}</h5>
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