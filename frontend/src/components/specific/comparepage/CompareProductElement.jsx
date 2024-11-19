import { useEffect, useState } from "react";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import FavouriteButton from "../../generic/FavouriteButton";
import { ReportFunctions } from "../../functions/ReportFunctions";
import { NavigateFunctions } from "../../functions/NavigateFunctions";

function CompareProductElement({ compareProductData, styles }) {
    const { setReportTypeProduct } = ReportFunctions();
    const { openProductpage } = NavigateFunctions();

    const [productID, setProductID] = useState(compareProductData.id);

    const handleClick = () => {
        openProductpage({ productID });
    };

    return (
        <div className={styles.compareProductContainer} onClick={handleClick}>

            <div className={styles.compareProductColumn}>
                <div className={styles.topRightElements}>
                    <CompareProductsButton givenProductID={productID} />
                    <ReportButton reportType={setReportTypeProduct()} givenReportedID={productID} />
                    <FavouriteButton givenProductID={productID} isInFavourite={compareProductData.isFavourite} />
                </div>
                <img src={compareProductData.productImageName} alt={compareProductData.productImageName} className={styles.compareProductImage} />
                <h3 className={styles.compareProductName}>{compareProductData.name}</h3>
                <h5 className={styles.compareProductPrice}>{compareProductData.price}</h5>
                <h5 className={styles.compareProductPrice}>{compareProductData.energeticValue}</h5>
                <h5 className={styles.compareProductPrice}>{compareProductData.carbs}</h5>
                <h5 className={styles.compareProductPrice}>{compareProductData.fat}</h5>
                <h5 className={styles.compareProductPrice}>{compareProductData.fiber}</h5>
                <h5 className={styles.compareProductPrice}>{compareProductData.inGrams === true ? "g" : "ml"}</h5>
                <h5 className={styles.compareProductPrice}>{compareProductData.protein}</h5>
                <h5 className={styles.compareProductPrice}>{compareProductData.salt}</h5>
                <h5 className={styles.compareProductPrice}>{compareProductData.weight}</h5>
                <h5 className={styles.compareProductPrice}>{compareProductData.sellerName}</h5>
                <img src={compareProductData.sellerImageName} alt={compareProductData.sellerImageName} className={styles.compareProductImage} />
            </div>
        </div>
    );
}

export default CompareProductElement;