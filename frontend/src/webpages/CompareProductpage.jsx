import {useEffect, useState} from "react";
import Header from "../components/generic/Header";
import SearchProductElement from "../components/specific/searchpage/SearchProductElement";
import Footer from "../components/generic/Footer";
import CompareProductElement from "../components/specific/comparepage/CompareProductElement";
import {SearchProductFunctions} from "../components/functions/SearchProductFunctions";
import {SellerAccountFunctions} from "../components/functions/SellerAccountFunctions";
import {ImagesFunctions} from "../components/functions/ImagesFunctions";
import {CustomEventsControler} from "../components/functions/CustomEventsControler";

const CompareProductpage = () => {
    const {getProductInformation} = SearchProductFunctions();
    const {addListenerDispatchOnCompareUpdate, removeListenerDispatchOnCompareUpdate} = CustomEventsControler();
    const {getSellerInformation} = SellerAccountFunctions();
    const {getImageByName} = ImagesFunctions();
    const CompareProducts = JSON.parse(localStorage.getItem("compareProductList"));

    const [isLoading,setIsLoading] = useState(true);

    const [productComparisonDetails, setProductComparisonDetails] = useState(null);
    console.log("CompareProducts: ", CompareProducts);


    useEffect(() => {
        addListenerDispatchOnCompareUpdate();

        const fetchAllProductDetails = async () => {
            const fetchedComparedProducts = await Promise.all (
                CompareProducts.map(async (comparedProductID) => {
                    const result = await getProductInformation({productID: comparedProductID});
                    if(result.success){
                        const product = result.productDetails;

                        const [sellerResult, productImageResult] = await Promise.all([
                            getSellerInformation({sellerID: product.sellerId}),
                            getImageByName({imageName: product.imageName}),
                        ]);

                        if (productImageResult.success) {
                            product.productImageName = productImageResult.image;
                        }else{
                            console.log(productImageResult.message);
                        }

                        if (sellerResult.success) {
                            const sellerImageResults = await getImageByName({imageName: sellerResult.sellerDetails.imageName});
                            if (sellerImageResults.success) {
                                product.sellerImageName = sellerImageResults.image;
                            }
                        }

                        // console.log("Fetched compared product: ",product);
                        setIsLoading(false);
                        return product;
                    }

                    // console.log("Fetched compared product FAILED ", result.success);
                    return [];
                })

            );

            console.log(fetchedComparedProducts);
            setProductComparisonDetails(fetchedComparedProducts);
        };

        fetchAllProductDetails();
        return () => {
            removeListenerDispatchOnCompareUpdate();
        }
    }, [isLoading]);

    if(productComparisonDetails == null){
        return <div>
            <p>LOADING</p>
        </div>
    }

    console.log("productComparisonDetails after loading: ", productComparisonDetails);

    return (
        <div>
            <div>
                <Header/>
                <h1>COMPARE product with</h1>
                <div id="comparedProducts">
                    {productComparisonDetails.length > 0 ? (
                        productComparisonDetails.map((product) => {
                            return (
                                <div key={product.id}>
                                    <CompareProductElement compareProductData={product}/>
                                </div>
                            );
                        })) : (
                        <div>
                            <p>no were selected to be compared</p>
                        </div>
                    )};
                </div>
                <Footer/>
            </div>
        </div>

    );

};

export default CompareProductpage;