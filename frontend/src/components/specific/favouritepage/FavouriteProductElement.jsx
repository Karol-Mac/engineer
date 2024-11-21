import {useEffect, useState} from "react";
import axios from "axios";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import {ReportFunctions} from "../../functions/ReportFunctions";
import FavouriteButton from "../../generic/FavouriteButton";
import {NavigateFunctions} from "../../functions/NavigateFunctions";
import ProductCompareToolbar from "../../generic/ProductCompareToolbar";
import {FavouriteFunctions} from "../../functions/FavouriteFunctions";
import styles from "../../../css/FavouriteProductElement.module.css";


function FavouriteProductElement ({favouriteProductData}) {
    const {openProductpage} = NavigateFunctions();
    const {removeFavouriteProduct} = FavouriteFunctions();

    const [valuePer100Units, setValuePer100Units] = useState(null);
    const [productName, setProductName] = useState(favouriteProductData.name);
    const [productImageName, setProductImageName] = useState(favouriteProductData.productImageName);
    const [productPrice, setProductPrice] = useState(favouriteProductData.price);
    const [productWeight, setProductWeight] = useState(favouriteProductData.productWeight);
    const [productIsGram, setProductIsGram] = useState(favouriteProductData.inGrams);

    const [productUpdateDate, setProductUpdateDate] = useState(new Date(favouriteProductData.updatedAt).toLocaleDateString('en-GB'));
    const [sellerName, setSellerName] = useState(favouriteProductData.sellerName);  //trzeba wziasc nazwe sprzedawcy po id
    const [sellerImageName, setSellerImageName] = useState(favouriteProductData.sellerImageName);

    const handleRemoveFavouriteClick = () => {
        removeFavouriteProduct(favouriteProductData.id);
    }

    useEffect(() => {

        const roundedValue = Number(favouriteProductData.price * (favouriteProductData.weight/1000.0)).toFixed(2);
        setValuePer100Units(roundedValue);
    }, [handleRemoveFavouriteClick]);

    const handleProductpageClick = (productID) => {
        openProductpage({productID});
    }
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    console.log("Product Image URL: ", productImageName);
    console.log("Seller Image URL: ", sellerImageName);

    return (
        <div id="Productpage" className={styles.favouriteProductContainer} onClick={() => handleProductpageClick(favouriteProductData.id)}>
            <div>
                <img className={styles.productImage} src={productImageName} alt={productImageName} />
                <br />
                <img className={styles.productImage} src={sellerImageName} alt={sellerImageName} />
            </div>
            <div onClick={stopPropagation}>
                <p onClick={handleRemoveFavouriteClick}>Remove from favourite</p>
            </div>

            <div>
                <h2 className={styles.productTitle}>{productName}</h2>
                <h2>Price: {productPrice} zł</h2>
                <h3>Price per 100 {productIsGram ? "g" : "ml"}: {valuePer100Units}</h3>
                <p>Seller {sellerName}</p>
            </div>
            <p>weight {productWeight} {productIsGram ? "g" : "ml"}</p>
            <ProductCompareToolbar />
        </div>
    );
}

export default FavouriteProductElement;