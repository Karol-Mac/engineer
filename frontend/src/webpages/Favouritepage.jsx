import { FavouriteFunctions } from "../components/functions/FavouriteFunctions";
import FavouriteProductElement from "../components/specific/favouritepage/FavouriteProductElement";
import React, { useEffect, useState } from "react";
import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import LoadingOverlay from "../components/specific/overlays/LoadingOverlay";
import { ImagesFunctions } from "../components/functions/ImagesFunctions";
import {SellerAccountFunctions} from "../components/functions/SellerAccountFunctions";

const Favouritepage = () => {
    const { removeFavouriteProduct, getFavouriteProducts } = FavouriteFunctions();
    const { getImageByName } = ImagesFunctions();
    const { getSellerInformation } = SellerAccountFunctions();
    const [favouriteProductsDetails, setFavouriteProductsDetails] = useState(null);
    const [isFetching, setIsFetching] = useState(true);


    useEffect(() => {
        const handleFetchingFavouriteProducts = async () => {
            const response = await getFavouriteProducts();

            function appendJson(favouriteProduct) {
                favouriteProduct.productImageName = favouriteProduct.productImageName || "";
                favouriteProduct.sellerImageName = favouriteProduct.sellerImageName || "";
                favouriteProduct.sellerName = favouriteProduct.sellerName || "";
            }

            if (response.success) {
                const foundFavouriteProducts = response.favouriteProducts;

                const latestProductsDetails = await Promise.all(
                    foundFavouriteProducts.map(async (favouriteProduct) => {
                        appendJson(favouriteProduct);

                        console.log("Favourite product: ", favouriteProduct);

                        const [favProductImage, sellerResult] = await Promise.all([
                            getImageByName({ imageName: favouriteProduct.imageName }),
                            getSellerInformation({ sellerID: favouriteProduct.sellerId }), // Ensure sellerId is correctly set
                        ]);

                        if (favProductImage.success) {
                            favouriteProduct.productImageName = favProductImage.image;
                        } else {
                            console.log(favProductImage.message);
                        }

                        if (sellerResult.success) {
                            console.log("sellerResult =-== " + sellerResult.sellerDetails.shopName);
                            favouriteProduct.sellerName = sellerResult.sellerDetails.shopName;

                            const sellerImageResults = await getImageByName({ imageName: sellerResult.sellerDetails.imageName });

                            if (sellerImageResults.success) {
                                favouriteProduct.sellerImageName = sellerImageResults.image;
                            } else {
                                console.log("sellerResult fetch unsuccessful: " + sellerImageResults.message);
                            }
                        }

                        return favouriteProduct;
                    })
                );

                setFavouriteProductsDetails(latestProductsDetails);
                setIsFetching(false);
                console.log("Fetching Fav successful");
            } else {
                console.log("Fetching Fav Failed \"" + response.message + "\"");
            }
        };

        handleFetchingFavouriteProducts();
    }, [isFetching]);

    if (favouriteProductsDetails == null) {
        return (
            <div>
                <Header />
                <LoadingOverlay />
                <Footer />
            </div>
        );
    }

    return (
        <div id="FavouriteProduct">
            <Header />
            {favouriteProductsDetails != null && favouriteProductsDetails.length > 0 ? (
                favouriteProductsDetails.map((product) => {
                    return (
                        <div key={product.id}>
                            {console.log("favouriteProducts page data passed: ", product)}
                            <FavouriteProductElement favouriteProductData={product} />
                            <br />
                            <br />
                        </div>
                    );
                })
            ) : (
                <div id="foundProducts">
                    <p>no favourite products</p>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Favouritepage;