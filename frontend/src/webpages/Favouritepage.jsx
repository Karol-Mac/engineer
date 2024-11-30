import { FavouriteFunctions } from "../components/functions/FavouriteFunctions";
import FavouriteProductElement from "../components/specific/favouritepage/FavouriteProductElement";
import React, { useEffect, useState } from "react";
import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import LoadingOverlay from "../components/specific/overlays/LoadingOverlay";
import { ImagesFunctions } from "../components/functions/ImagesFunctions";
import {SellerAccountFunctions} from "../components/functions/SellerAccountFunctions";
import styles from "../css/Favouritepage.module.css";

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

                        const [favProductImage, sellerResult] = await Promise.all([
                            getImageByName({ imageName: favouriteProduct.imageName }),
                            getSellerInformation({ sellerID: favouriteProduct.sellerId }),
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

    const removeAllFavourites = async () => {
        if(favouriteProductsDetails == null || favouriteProductsDetails.length === 0) { return; }

        for(const favouriteProduct of favouriteProductsDetails){
            try{
                const response = await removeFavouriteProduct({productID: favouriteProduct.id});
                if(response.success) {
                    console.log("Successfully removed favourite product: ", favouriteProduct);
                }else{
                    console.log("Failed to remove favourite product: ", favouriteProduct);
                }
            }catch(error){
                console.log("Error removing favourite product: ", error);
            }
        }

        setIsFetching(true);
    }

    return (
        <div id="FavouriteProduct">
            <Header />
            <div className={styles.removeAllFavouritesButton}>
                <button onClick={removeAllFavourites}>Remove all favourites</button>
            </div>
            <div>
                {favouriteProductsDetails != null && favouriteProductsDetails.length > 0 ? (
                    <div className={styles.productGrid}>
                        {favouriteProductsDetails.map((product) => {
                            return (
                                <div key={product.id}>
                                    <FavouriteProductElement favouriteProductData={product} />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.FoundProducts}>
                        <h1>no favourite products</h1>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Favouritepage;