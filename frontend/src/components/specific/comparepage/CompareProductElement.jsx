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
        <div className={styles.compareProductColumn} onClick={handleClick}>
                <img src={compareProductData.productImageName} alt={compareProductData.productImageName} className={styles.compareProductImage} />

                {/* Product rows */}
                <div className={styles.legendOverlayContainer}>
                    <div className={styles.legendOverlayRow}>
                        <div className={styles.legendLabel}>Product Name</div>
                        <div className={styles.propertyValue}>{compareProductData.name}</div>
                    </div>
                    <div className={styles.legendOverlayRow}>
                        <div className={styles.legendLabel}>Price</div>
                        <div className={styles.propertyValue}>{compareProductData.price}</div>
                    </div>
                    <div className={styles.legendOverlayRow}>
                        <div className={styles.legendLabel}>Energetic Value</div>
                        <div className={styles.propertyValue}>{compareProductData.energeticValue}</div>
                    </div>
                    <div className={styles.legendOverlayRow}>
                        <div className={styles.legendLabel}>Carbs</div>
                        <div className={styles.propertyValue}>{compareProductData.carbs}</div>
                    </div>
                    <div className={styles.legendOverlayRow}>
                        <div className={styles.legendLabel}>Fat</div>
                        <div className={styles.propertyValue}>{compareProductData.fat}</div>
                    </div>
                    <div className={styles.legendOverlayRow}>
                        <div className={styles.legendLabel}>Fiber</div>
                        <div className={styles.propertyValue}>{compareProductData.fiber}</div>
                    </div>
                    <div className={styles.legendOverlayRow}>
                        <div className={styles.legendLabel}>Weight</div>
                        <div className={styles.propertyValue}>{compareProductData.weight}</div>
                    </div>
                    <div className={styles.legendOverlayRow}>
                        <div className={styles.legendLabel}>Protein</div>
                        <div className={styles.propertyValue}>{compareProductData.protein}</div>
                    </div>
                    <div className={styles.legendOverlayRow}>
                        <div className={styles.legendLabel}>Salt</div>
                        <div className={styles.propertyValue}>{compareProductData.salt}</div>
                    </div>
                    <div className={styles.legendOverlayRow}>
                        <div className={styles.legendLabel}>Seller</div>
                        <div className={styles.propertyValue}>{compareProductData.sellerName}</div>
                    </div>
                </div>

                <img src={compareProductData.sellerImageName} alt={compareProductData.sellerImageName} className={styles.compareProductImage} />
            </div>
    );
}

export default CompareProductElement;