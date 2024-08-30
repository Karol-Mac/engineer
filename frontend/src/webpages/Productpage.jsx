import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {SearchProductFunctions} from "../components/functions/SearchProductFunctions";
import {SellerAccountFunctions} from "../components/functions/SellerAccountFunctions";
import {ImagesFunctions} from "../components/functions/ImagesFunctions";
import ProductCompareToolbar from "../components/generic/ProductCompareToolbar";
import CompareProductsButton from "../components/generic/CompareProductsButton";
import FavouriteButton from "../components/generic/FavouriteButton";
import ReportButton from "../components/generic/ReportButton";
import {ReportFunctions} from "../components/functions/ReportFunctions";

const Productpage = () => {
    const{getProductInformation} = SearchProductFunctions();
    const{getSellerInformation} = SellerAccountFunctions();
    const{getImageByName} = ImagesFunctions()
    const{setReportTypeProduct} = ReportFunctions();
    const {id} = useParams();

    const [productDetails, setProductDetails] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [valuePer100Units, setValuePer100Units] = useState(null);
    const [sellerDetails, setSellerDetails] = useState(null);
    const [sellerImage, setSellerImage] = useState(null);

    useEffect(() => {
        const fetchAllProductDetails = async () => {
            await getProductInformation({productID: id}).then(
               async (result) => {
                    if (result.success) {
                        setProductDetails(result.productDetails);

                        const roundedValue = Number(result.productDetails.price * (result.productDetails.weight/1000.0)).toFixed(2);
                        setValuePer100Units(roundedValue);


                        const [sellerResult, productImageResult] = await Promise.all([
                            getSellerInformation({sellerID: result.productDetails.sellerId}),
                            getImageByName({imageName: result.productDetails.imageName}),
                        ]);

                        if (productImageResult.success){
                            setProductImage(productImageResult.image);
                        }

                        if (sellerResult.success) {
                            setSellerDetails(sellerResult.sellerDetails);
                            const sellerImageResults = await getImageByName({imageName: sellerResult.sellerDetails.imageName});
                            if (sellerImageResults.success) {
                                setSellerImage(sellerImageResults.image);
                            }
                        }

                        console.log("Products:", result.productDetails);
                    } else {
                        console.log("Error fetching products:", result.message);
                    }
                }
            )
        }

        fetchAllProductDetails();
    },[id]);

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
                reportType, reportedProductID
                <CompareProductsButton givenProductID={productDetails.id}/>
                <ReportButton reportType={setReportTypeProduct()} givenReportedID={productDetails.id} />
                <FavouriteButton givenProductID={productDetails.id} isInFavourite={productDetails.isFavourite}/>
            </div>

           <div>
               <h2>{productDetails.name}</h2>
               <h2>Price: {productDetails.price} zł</h2>
               <h3>Price per 100 {productDetails.inGrams ? "g" : "ml"}: {valuePer100Units}</h3>
               <p>Seller {sellerDetails.shopName}</p>
           </div>
            <p>weight {productDetails.weight} {productDetails.inGrams ? "g" : "ml"}</p>
            <p>fat {productDetails.fat}</p>
            <p>carbs {productDetails.carbs}</p>
            <p>fiber {productDetails.fiber}</p>
            <p>salt {productDetails.salt}</p>
            <p>protein {productDetails.protein}</p>
            <ProductCompareToolbar/>
        </div>
    );

};

export default Productpage;