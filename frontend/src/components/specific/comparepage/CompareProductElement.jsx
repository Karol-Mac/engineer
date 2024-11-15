import {useEffect, useState} from "react";
import axios from "axios";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import {ReportFunctions} from "../../functions/ReportFunctions";
import FavouriteButton from "../../generic/FavouriteButton";
import {NavigateFunctions} from "../../functions/NavigateFunctions";

function CompareProductElement ({compareProductData}) {
    const {setReportTypeProduct} = ReportFunctions();
    const {openProductpage} = NavigateFunctions();

    console.log("Productdata: ",compareProductData);

    const [productID, setProductID] = useState(compareProductData.productID);
    const [productName, setProductName] = useState(compareProductData.name);
    const [productImageName, setProductImageName] = useState(compareProductData.productImageName);
    const [productPrice, setProductPrice] = useState(compareProductData.price);
    const [sellerID, setSellerID] = useState(compareProductData.SellerID);
    const [sellerName, setSellerName] = useState("");  //trzeba wziasc nazwe sprzedawcy po id
    const [sellerImageName, setSellerImageName] = useState(compareProductData.sellerImageName);

    const handleClick = () => {
        openProductpage({productID});
    }

    return (
        <div className="searchedProductItem" onClick={handleClick}>
            <img src={productImageName} alt={productImageName} className="foundProductImg"/>
            <img src={sellerImageName} alt={sellerImageName}/>
            {/*div-s są ustawione tymczasowo, przy robieniu css-a mozna je zignorowac do lepszego wykonania grafiki*/}
            <div>
                <CompareProductsButton givenProductID={productID}/>
                <ReportButton reportType={setReportTypeProduct()} givenReportedID={productID}/>
                <FavouriteButton givenProductID={productID} isInFavourite={compareProductData.isFavourite}/>
            </div>
            <div>
                {/*{/*add company image component + function to give it data*/}
            </div>
            <div>
                <h3>Data:</h3>
                <h3 className="searchedProductName">{productName}</h3>
                <h5 className="searchedProductPrice">{productPrice}</h5>
                {console.log("sellerImageName : ", sellerImageName,"productImageName : ", productImageName,"productName")}
            </div>
        </div>

    );


}

export default CompareProductElement;