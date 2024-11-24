import { useEffect, useState } from "react";
import { NavigateFunctions } from "../../functions/NavigateFunctions";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import FavouriteButton from "../../generic/FavouriteButton";
import { ReportFunctions } from "../../functions/ReportFunctions";
import styles from "../../../css/ProductTable.module.css";

function CompareProductElement({ compareProductData, styles }) {
    const { setReportTypeProduct } = ReportFunctions();
    const { openProductpage } = NavigateFunctions();
    const [productID, setProductID] = useState(compareProductData.id);

    const handleClick = () => {
        openProductpage({ productID });
    };

    const productDetails = compareProductData;

    // Basic info rows - similar to ProductTable.js example
    const basicInfoRows = [
        { attribute: "Price:", value: `${productDetails.price} zł` },
        { attribute: "Price per 100g:", value: `${(productDetails.price * (100 / productDetails.weight)).toFixed(2)} zł` },
    ];

    // Detailed info rows
    const detailRows = [
        { attribute: "Weight:", value: `${productDetails.weight} g` },
        { attribute: "Energetic Value:", value: `${productDetails.energeticValue} kcal` },
        { attribute: "Carbs:", value: `${productDetails.carbs} g` },
        { attribute: "Fat:", value: `${productDetails.fat} g` },
        { attribute: "Protein:", value: `${productDetails.protein} g` },
        { attribute: "Fiber:", value: `${productDetails.fiber} g` },
        { attribute: "Salt:", value: `${productDetails.salt} g` },
    ];

    return (
        <div className={styles.compareProductColumn} onClick={handleClick}>
            <h2 className={styles.productName}>{productDetails.name}</h2>

            {/* Obrazek produktu */}
            <img
                src={productDetails.productImageName}
                alt={productDetails.productImageName}
                className={styles.compareProductImage}
            />

            <table className={styles.productTable}>
                <thead>
                <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                {basicInfoRows.map((row, index) => (
                    <tr key={index}>
                        <th>{row.attribute}</th>
                        <td>{row.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Tabela z detalami */}
            <table className={styles.productTable}>
                <thead>
                <tr>
                    <th>Attribute</th>
                    <th>Value per 100g</th>
                </tr>
                </thead>
                <tbody>
                {detailRows.map((row, index) => (
                    <tr key={index}>
                        <td>{row.attribute}</td>
                        <td>{row.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}

export default CompareProductElement;
