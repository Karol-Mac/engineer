import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {SearchProductFunctions} from "../components/functions/SearchProductFunctions";
import {SellerAccountFunctions} from "../components/functions/SellerAccountFunctions";
import {ImagesFunctions} from "../components/functions/ImagesFunctions";

const Productpage = () => {
    const{getProductInformation} = SearchProductFunctions();
    const{getSellerInformation} = SellerAccountFunctions();
    const{getImageByName} = ImagesFunctions()
    const {id} = useParams();

    const [productDetails, setProductDetails] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [valuePer100Units, setValuePer100Units] = useState(null);
    const [productUnit, setProductUnit] = useState("");
    const [sellerDetails, setSellerDetails] = useState(null);
    const [sellerImage, setSellerImage] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            await getProductInformation({productID: id}).then(
                (result) => {
                    if (result.success) {
                        setProductDetails(result.productDetails);
                        const roundedValue = Number(result.productDetails.price * (result.productDetails.weight/1000.0)).toFixed(2);
                        setValuePer100Units(roundedValue);

                        if(result.productDetails.inGrams){
                            setProductUnit("g");
                        }else{
                            setProductUnit("ml");
                        }
                        console.log("Products:", result.productDetails);
                    } else {
                        console.log("Error fetching products:", result.message);
                    }
                }
            )
        }
        fetchProductDetails();
    },[id]);

    useEffect(() => {
        if(productDetails && productDetails.sellerId) {
            const fetchSellerDetails = async () => {
                await getSellerInformation({sellerID: productDetails.sellerId}).then(
                    (result) => {
                        if (result.success) {
                            setSellerDetails(result.sellerDetails);
                            console.log("Products:", result.sellerDetails);
                        } else {
                            console.log("Error fetching products:", result.message);
                        }
                    }
                )
            }

            fetchSellerDetails();
        }
    },[productDetails]);

    useEffect(() => {
        if(productDetails && sellerDetails) {
            const fetchProductImage = async() => {
                await getImageByName({imageName: productDetails.imageName}).then(
                    (result) => {
                        if (result.success) {
                            setProductImage(result.image);
                        } else {
                            console.log("Error fetching image:", result.message);
                        }
                    }
                )
            }

            const fetchSellerImage = async() => {
                await getImageByName({imageName: sellerDetails.imageName}).then(
                    (result) => {
                        if (result.success) {
                            setSellerImage(result.image);
                            console.log("Seller:", result.image);
                        } else {
                            console.log("Error fetching Seller:", result.message);
                        }
                    }
                )
            }

            fetchProductImage();
            fetchSellerImage();
        }
    },[sellerDetails])



    // console.log("productID: "+id);
    if(productDetails == null || sellerDetails == null || productImage == null || sellerImage == null){
        return <div>
            <p>LOADING</p>
        </div>
    }


    return (
        <div id="Productpage">
            <div>
                <img className="ProductPageProductImage" src={productImage} alt={productDetails.imageName}/>
                <br/>
                <img className="ProductPageSellerImage" src={sellerImage} alt={sellerDetails.imageName}/>
            </div>

           <div>
               <h2>{productDetails.name}</h2>
               <h2>Price: {productDetails.price} zł</h2>
               <h3>Price per 100 {productUnit}: {valuePer100Units}</h3>
               <p>Seller {sellerDetails.shopName}</p>
           </div>
            <p>weight {productDetails.weight} {productDetails.inGrams ? "g" : "ml"}</p>
            <p>fat {productDetails.fat}</p>
            <p>carbs {productDetails.carbs}</p>
            <p>fiber {productDetails.fiber}</p>
            <p>salt {productDetails.salt}</p>
            <p>protein {productDetails.protein}</p>
        </div>

    );

};

export default Productpage;