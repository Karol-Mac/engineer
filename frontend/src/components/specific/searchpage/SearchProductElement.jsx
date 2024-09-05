import {useState} from "react";
import axios from "axios";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import {ReportFunctions} from "../../functions/ReportFunctions";

//{givenProductName, givenPrice} if id
function SearchProductElement (productData) {
    const {setReportTypeProduct} = ReportFunctions();

    const [productID, setProductID] = useState(null);
    const [productName, setProductName] = useState("");
    const [productImageName, setProductImageName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [sellerID, setSellerID] = useState(null);
    const [sellerName, setSellerName] = useState("");  //trzeba wziasc nazwe sprzedawcy po id
    const [sellerImageName, setSellerImageName] = useState("");
    const handlePrivateSignup = async(e,givenProductID) =>{
        e.preventDefault();

        try {
            var productDataUrl = "/api/products/"+givenProductID;
            const {productData: resProduct} = await axios.get(productDataUrl);

            setProductName(resProduct.name);
            setProductPrice(resProduct.price);
            setProductImageName(resProduct.imageName);
            setSellerID(resProduct.sellerID)

            var sellerDataUrl = "/api/accounts/{sellerId}";
            const {sellerData: resSeller} = await axios.get(sellerDataUrl);

            setSellerImageName(resSeller.imageName);
        }catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div id="SearchProductElementDiv">
            <img src={productImageName} alt="ProductImage.jpg" className="SeachProductImage"/>
            <CompareProductsButton givenProductID={productID}/>
            <ReportButton  givenReportedID={productID} reportType={setReportTypeProduct}/>
            <h1>{productName}</h1>
            <h3>Company: PLACEHOLDER</h3>
            {/*<div onClick={openComparepage} id="SearchProductSeller" className="SearchProductSellerDiv">  /!*Open Company page by id ? *!/*/}
            <img src={sellerImageName} alt="SearchProductSellerImg.jpg" id="SearchProductSellerImg"/>
            {/*</div>*/}
            {/*    Open favourites button */}
            <h2>{productPrice}</h2>
        </div>

    );


}

export default SearchProductElement;