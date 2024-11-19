import {FavouriteFunctions} from "../components/functions/FavouriteFunctions";
import FavouriteProductElement from "../components/specific/favouritepage/FavouriteProductElement";
import React, {useEffect, useState} from "react";
import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";

const Favouritepage = () => {
    const {removeFavouriteProduct, getFavouriteProducts} = FavouriteFunctions();
    const [favouriteProducts, setFavouriteProducts] = useState(null);
    const [isFetching, setIsFetching] = useState(true);


    useEffect(() => {
        const handleFetchingFavoruiteProducts = async () => {
            const response = await getFavouriteProducts();


            if (response.success) {
                setFavouriteProducts(response.favouriteProducts);
                if (response.removedProductsName != null) {
                    console.log("Products are no longer available: ", response.removedProductsName);
                }
                setIsFetching(false);
                console.log("Fetching Fav successful");
            } else {
                //Error overlay that displayes message and have button that opens Homepage
                console.log("Fetching Fav Failed \"" + response.message + "\"");
            }
        }
        handleFetchingFavoruiteProducts()
    }, [isFetching]);

    if(favouriteProducts == null){
        return <div>
            <h1>Loading</h1>
        </div>
    }


    return (
        <div id="FavouriteProduct">
            <Header/>
            {favouriteProducts != null && favouriteProducts.length > 0 ? (
                favouriteProducts.map((product) => {
                    return (
                        //div-s are temprorary so that I can make more space between found elements
                        <div key={product.id}>
                            {console.log("favouriteProducts page data passed: ",product)}
                            <FavouriteProductElement favouriteProductData={product}/>
                            <br/>
                            <br/>
                        </div>
                    );
                })) : (
                <div id="foundProducts">
                    <p>no favourite products</p>
                </div>
            )};

            <Footer/>
        </div>

    );

};

export default Favouritepage;