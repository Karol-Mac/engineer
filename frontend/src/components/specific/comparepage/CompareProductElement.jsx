import {useEffect, useState} from "react";
import axios from "axios";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import {ReportFunctions} from "../../functions/ReportFunctions";
import FavouriteButton from "../../generic/FavouriteButton";
import {NavigateFunctions} from "../../functions/NavigateFunctions";

function CompareProductElement ({compareProductData, styles}) {
    const {setReportTypeProduct} = ReportFunctions();
    const {openProductpage} = NavigateFunctions();

    console.log("Productdata: ",compareProductData);

    const [productID, setProductID] = useState(compareProductData.productID);
    const [productName, setProductName] = useState(compareProductData.name);
    const [productImageName, setProductImageName] = useState(compareProductData.productImageName);
    const [productPrice, setProductPrice] = useState(compareProductData.price);
    const [productEnergeticValue, setProductEnergeticValue] = useState(compareProductData.energeticValue);
    const [productCarbs, setProductCarbs] = useState(compareProductData.carbs);
    const [productFat, setProductFat] = useState(compareProductData.fat);
    const [productFiber, setProductFiber] = useState(compareProductData.fiber);
    const [productInGrams, setProductInGrams] = useState(compareProductData.inGrams);
    const [productProtein, setProductProtein] = useState(compareProductData.protein);
    const [productSalt, setProductSalt] = useState(compareProductData.salt);
    const [productWeight, setProductWeight] = useState(compareProductData.weight);
    const [sellerID, setSellerID] = useState(compareProductData.SellerID);
    const [sellerName, setSellerName] = useState("");  //trzeba wziasc nazwe sprzedawcy po id
    const [sellerImageName, setSellerImageName] = useState(compareProductData.sellerImageName);

    const handleClick = () => {
        openProductpage({productID});
    }

    return (
        <div className={styles.compareProductContainer} onClick={handleClick}>
            <div className={styles.compareProductColumn}>
                <img src={productImageName} alt={productImageName} className={styles.compareProductImage}/>
                {/*div-s są ustawione tymczasowo, przy robieniu css-a mozna je zignorowac do lepszego wykonania grafiki*/}
                <h3 className={styles.compareProductName}>{productName}</h3>
                <h5 className={styles.compareProductPrice}>{productPrice}</h5>
                <h5 className={styles.compareProductPrice}>{productEnergeticValue}</h5>
                <h5 className={styles.compareProductPrice}>{productCarbs}</h5>
                <h5 className={styles.compareProductPrice}>{productFat}</h5>
                <h5 className={styles.compareProductPrice}>{productFiber}</h5>
                <h5 className={styles.compareProductPrice}>{productInGrams === true ? "g" : "ml"}</h5>
                <h5 className={styles.compareProductPrice}>{productProtein}</h5>
                <h5 className={styles.compareProductPrice}>{productSalt}</h5>
                <h5 className={styles.compareProductPrice}>{productWeight}</h5>
                <h5 className={styles.compareProductPrice}>{sellerName}</h5>
                {/*{console.log("sellerImageName : ", sellerImageName,"productImageName : ", productImageName,"productName")}*/}
                <img src={sellerImageName} alt={sellerImageName} className={styles.compareProductImage}/>
                    <CompareProductsButton givenProductID={productID}/>
                    <ReportButton reportType={setReportTypeProduct()} givenReportedID={productID}/>
                    <FavouriteButton givenProductID={productID} isInFavourite={compareProductData.isFavourite}/>
                </div>


        </div>

    );


}

export default CompareProductElement;