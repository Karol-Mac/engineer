import {useState} from "react";
import {ReportFunctions} from "../../functions/ReportFunctions";
import {NavigateFunctions} from "../../functions/NavigateFunctions";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import FavouriteButton from "../../generic/FavouriteButton";
import {LoginFunctions} from "../../functions/LoginFunctions";

export function LatestProductsElement ({latestProductData, styles}) {
    const {setReportTypeProduct} = ReportFunctions();
    const {openProductpage} = NavigateFunctions();
    const { isAdminUser , isSeller} = LoginFunctions();

    const [productID, setProductID] = useState(latestProductData.id);
    const [productName, setProductName] = useState(latestProductData.name);
    const [productImageName, setProductImageName] = useState(latestProductData.productImageName);
    const [productPrice, setProductPrice] = useState(latestProductData.price);
    const [sellerID, setSellerID] = useState(latestProductData.SellerID);
    const [productUpdateDate, setProductUpdateDate] = useState(new Date(latestProductData.updatedAt).toLocaleDateString('en-GB'));
    const [sellerName, setSellerName] = useState("");  //trzeba wziasc nazwe sprzedawcy po id
    const [sellerImageName, setSellerImageName] = useState("");

    const handleClick = () =>{
        // console.log("Opening prodduct page with productID : ",productID);
        openProductpage({productID});
    }

    return (
        <div className={styles.latestProductElement} >
            <div className={styles.topRightElements}>
                <CompareProductsButton givenProductID={productID} />
                {(!isSeller() && !isAdminUser()) && (
                    <ReportButton reportType={setReportTypeProduct()} givenReportedID={productID} />
                )}
                <FavouriteButton givenProductID={productID} isInFavourite={latestProductData.isFavourite} />
            </div>
            <img src={productImageName} alt={productImageName} className={styles.latestProductImage} onClick={handleClick} />
            <div onClick={handleClick}>
                <h3 className={styles.latestProductName}>{productName}</h3>
                <h5 className={styles.latestProductPrice}>{productPrice.toFixed(2)} zł</h5>
                <h5 className="latestProductUpdateDate">{productUpdateDate}</h5>
            </div>
        </div>

    );
}