import {useState} from "react";
import Header from "../../generic/Header";
import Footer from "../../generic/Footer";
import axios from "axios";

//{givenProductName, givenPrice} if id
export function LatestProductsElement ({givenProductID}) {

    const [productName, setProductName] = useState(null);
    const [productImageName, setProductImageName] = useState(null);
    const [price, setPrice] = useState(null);
    const [sellerID, setSellerID] = useState(null);
    const [sellerImageName, setSellerImageName] = useState(null);
    const handlePrivateSignup = async(e,givenProductID) =>{
        e.preventDefault();

        try {
            var productDataUrl = "/api/products/"+givenProductID;
            const {productData: resProduct} = await axios.get(productDataUrl);

            setProductName(resProduct.name);
            setPrice(resProduct.price);
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
        //
        <div>
            <h1>Site title</h1>
            <a href="" onClick={openComparepage} id="CompareImg">
                <img src="CompareLogoImg.jpg" alt="CompareLogoImg.jpg" id="CompareLogoImg2"/>
            </a>
        </div>

    );


}