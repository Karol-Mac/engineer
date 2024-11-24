import React from "react";
import styles from "../../../css/ProductTable.module.css";

const ProductTable = ({ productDetails, productImage, sellerDetails }) => {
    if (!productDetails || !sellerDetails) {
        return null;
    }

    const basicInfoRows = [
        { attribute: "Price:", value: `${productDetails.price} zł` },
        { attribute: `Price per 100 ${productDetails.inGrams ? "g:" : "ml:"}`, value: `${(productDetails.price * (100 / productDetails.weight)).toFixed(2)} zł` },
    ];

    const detailRows = [
        { attribute: "Weight:", value: `${productDetails.weight} ${productDetails.inGrams ? "g" : "ml"}` },
        { attribute: "Energetic Value:", value: `${productDetails.energeticValue} kcal` },
        { attribute: "Carbs:", value: `${productDetails.carbs} g` },
        { attribute: "Fat:", value: `${productDetails.fat} g` },
        { attribute: "Protein:", value: `${productDetails.protein} g` },
        { attribute: "Fiber:", value: `${productDetails.fiber} g` },
        { attribute: "Salt:", value: `${productDetails.salt} g` },
    ];

    const sellerInfoRows = [
        { attribute: "Shop Name:", value: sellerDetails.shopName },
        { attribute: "Email:", value: sellerDetails.email },
    ];

    return (
        <div className={styles.productTableContainer}>
            {}
            <table className={styles.imageTable}>
                <tbody>
                <tr>
                    <td>
                        <h1 className={styles.productName}>{productDetails.name}</h1>
                        <img
                            className={styles.productPageProductImage}
                            src={productImage}
                            alt={productDetails.name}
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            {}
            <table className={styles.basicInfoTable}>
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
            <table className={styles.basicInfoTable}>
                <thead>
                <tr>
                    <th>Attribute per 100 g:</th>
                    <th>Value:</th>
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

            {}
            <table className={styles.basicInfoTable}>
                <thead>
                <tr>
                    <th>Seller Information:</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {sellerInfoRows.map((row, index) => (
                    <tr key={index}>
                        <th>{row.attribute}</th>
                        <td>{row.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
