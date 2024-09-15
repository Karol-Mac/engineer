import {useState} from "react";
import axios from "axios";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import {ReportFunctions} from "../../functions/ReportFunctions";
import FavouriteButton from "../../generic/FavouriteButton";

function SearchProductElement ({productData}) {
    const {setReportTypeProduct} = ReportFunctions();

    const [productID, setProductID] = useState(productData.productID);
    const [productName, setProductName] = useState(productData.productName);
    const [productImageName, setProductImageName] = useState(productData.productImageName);
    const [productPrice, setProductPrice] = useState(productData.productPrice);
    const [sellerID, setSellerID] = useState(productData.SellerID);
    const [sellerName, setSellerName] = useState("");  //trzeba wziasc nazwe sprzedawcy po id
    const [sellerImageName, setSellerImageName] = useState("");

    return (
        <div className="searchedProductItem">
            <img src={productImageName} alt={productImageName} className="foundProductImg"/>
            {/*div-s są ustawione tymczasowo, przy robieniu css-a mozna je zignorowac do lepszego wykonania grafiki*/}
            <div>
                <CompareProductsButton givenProductID={productID}/>
                <ReportButton givenProductID={productID} reportType={setReportTypeProduct}></ReportButton>
                <FavouriteButton/>
            </div>
            <div>
                {/*{/*add company image component + function to give it data*/}
            </div>
            <div>
                <h3 className="searchedProductName">{productName}</h3>
                <h5 className="searchedProductPrice">{productPrice}</h5>
            </div>
        </div>

    );


}

export default SearchProductElement;