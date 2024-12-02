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
import RemoveFavouriteButton from "./RemoveFavouriteButton";


function FavouriteProductElement ({favouriteProductData}) {
    const {openProductpage} = NavigateFunctions();
    const {removeFavouriteProduct} = FavouriteFunctions();

    const [valuePer100Units, setValuePer100Units] = useState(null);
    const [productName, setProductName] = useState(favouriteProductData.name);
    const [productImageName, setProductImageName] = useState(favouriteProductData.productImageName);
    const [productPrice, setProductPrice] = useState(favouriteProductData.price);
    const [productWeight, setProductWeight] = useState(favouriteProductData.weight);
    const [productIsGram, setProductIsGram] = useState(favouriteProductData.inGrams);

    const [productUpdateDate, setProductUpdateDate] = useState(new Date(favouriteProductData.updatedAt).toLocaleDateString('en-GB'));
    const [sellerName, setSellerName] = useState(favouriteProductData.sellerName);  //trzeba wziasc nazwe sprzedawcy po id
    const [sellerImageName, setSellerImageName] = useState(favouriteProductData.sellerImageName);

    const handleRemoveFavouriteClick = () => {
        console.log("Removing product from favourites with ID: ", favouriteProductData.id);
        removeFavouriteProduct(favouriteProductData.id);
    }

    useEffect(() => {

        const roundedValue = Number(favouriteProductData.price * (100.0/favouriteProductData.weight)).toFixed(2);
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
            </div>


            <div className={styles.productDetails}>
                <img className={styles.sellerImage} src={sellerImageName} alt={sellerImageName} />
                <h2 className={styles.productTitle}>{productName}</h2>
                <h2 className={styles.priceDefault}>Price: {parseFloat(productPrice).toFixed(2)} zł</h2>
                <h3 className={styles.priceByWeight}>Price per 100 {productIsGram ? "g" : "ml"}: {valuePer100Units} zł</h3>
                <h3 className={styles.priceByWeight}>Weight: {productWeight} {productIsGram ? "g" : "ml"}</h3>
            </div>
            <RemoveFavouriteButton favouriteProductID={favouriteProductData.id}/>
        </div>
    );
}

export default FavouriteProductElement;