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
import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import styles from "../css/Productpage.module.css"
import LoadingOverlay from "../components/specific/overlays/LoadingOverlay";
import ProductTable from "../components/specific/productpage/ProductTable";
import EditProductButton from "../components/generic/EditProductButton";
import {LoginFunctions} from "../components/functions/LoginFunctions";

const Productpage = () => {
    const{getProductInformation} = SearchProductFunctions();
    const{getSellerInformation} = SellerAccountFunctions();
    const{getImageByName} = ImagesFunctions()
    const{setReportTypeProduct} = ReportFunctions();
    const {id} = useParams();
    const { isAdminUser, isSeller } = LoginFunctions();


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

                        const roundedValue = Number(result.productDetails.price * (100.0/result.productDetails.weight)).toFixed(2);
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
            <Header/>
            <LoadingOverlay/>
            <Footer/>
        </div>;
    }

    return (
        <div>
            <Header/>
            <div id="Productpage" className={styles.productPageContainer}>
                <div className={styles.productActionsContainer}>
                    <CompareProductsButton givenProductID={productDetails.id}/>
                    <ReportButton reportType={setReportTypeProduct()} givenReportedID={productDetails.id}/>
                    <FavouriteButton givenProductID={productDetails.id} isInFavourite={productDetails.isFavourite}/>
                    {(isSeller() || isAdminUser()) && (
                        <EditProductButton givenProductID={productDetails.id} />
                    )}
                </div>

                <div className={styles.productDetailsContainer}>
                    <div className={styles.productInfo}>
                        <ProductTable
                            productDetails={productDetails}
                            productImage={productImage}
                            sellerDetails={sellerDetails}
                        />
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    );
};

            export default Productpage;