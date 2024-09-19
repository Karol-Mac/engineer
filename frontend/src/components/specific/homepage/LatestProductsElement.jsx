import {useState} from "react";
import {ReportFunctions} from "../../functions/ReportFunctions";
import {NavigateFunctions} from "../../functions/NavigateFunctions";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import FavouriteButton from "../../generic/FavouriteButton";

export function LatestProductsElement ({latestProductData}) {
    const {setReportTypeProduct} = ReportFunctions();
    const {openProductpage} = NavigateFunctions();

    const [productID, setProductID] = useState(latestProductData.productID);
    const [productName, setProductName] = useState(latestProductData.productName);
    const [productImageName, setProductImageName] = useState(latestProductData.productImageName);
    const [productPrice, setProductPrice] = useState(latestProductData.productPrice);
    const [productUpdateDate, setProductUpdateDate] = useState(latestProductData.productUpdateDate);
    const [sellerID, setSellerID] = useState(latestProductData.SellerID);
    const [sellerName, setSellerName] = useState("");  //trzeba wziasc nazwe sprzedawcy po id
    const [sellerImageName, setSellerImageName] = useState("");

    const handleClick = () =>{
        openProductpage({productID});
    }

    return (
        <div className="searchedProductItem" onClick={handleClick}>
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
                <h3 className="latestProductName">{productName}</h3>
                <h5 className="latestProductPrice">{productPrice}</h5>
                <h5 className="latestProductUpdateDate">{productUpdateDate}</h5>
            </div>
        </div>

    );
}