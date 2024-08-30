import {useState} from "react";
import {ReportFunctions} from "../../functions/ReportFunctions";
import {NavigateFunctions} from "../../functions/NavigateFunctions";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import FavouriteButton from "../../generic/FavouriteButton";

export function LatestProductsElement ({latestProductData}) {
    const {setReportTypeProduct} = ReportFunctions();
    const {openProductpage} = NavigateFunctions();

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
        <div className="searchedProductItem" >
            <img src={productImageName} alt={productImageName} className="foundProductImg" onClick={handleClick}/>
            {/*div-s są ustawione tymczasowo, przy robieniu css-a mozna je zignorowac do lepszego wykonania grafiki*/}
            <div>
                <CompareProductsButton givenProductID={productID}/>
                <ReportButton  reportType={setReportTypeProduct()} givenReportedID={productID} />
                <FavouriteButton givenProductID={productID}  isInFavourite={latestProductData.isFavourite}/>
            </div>
            <div>
                {/*{/*add company image component + function to give it data*/}
            </div>
            <div onClick={handleClick}>
                <h3 className="latestProductName">{productName}</h3>
                <h5 className="latestProductPrice">{productPrice}</h5>
                <h5 className="latestProductUpdateDate">{productUpdateDate}</h5>
            </div>
        </div>

    );
}