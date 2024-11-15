import {useEffect, useState} from "react";
import axios from "axios";
import CompareProductsButton from "../../generic/CompareProductsButton";
import ReportButton from "../../generic/ReportButton";
import {ReportFunctions} from "../../functions/ReportFunctions";
import FavouriteButton from "../../generic/FavouriteButton";
import {NavigateFunctions} from "../../functions/NavigateFunctions";
import ProductCompareToolbar from "../../generic/ProductCompareToolbar";
import {FavouriteFunctions} from "../../functions/FavouriteFunctions";

function FavouriteProductElement ({favouriteProductData}) {
    const {openProductpage} = NavigateFunctions();
    const {removeFavouriteProduct} = FavouriteFunctions();

    const [valuePer100Units, setValuePer100Units] = useState(null);

    const handleRemoveFavouriteClick = () => {
        removeFavouriteProduct(favouriteProductData.id);
    }

    useEffect(() => {

        const roundedValue = Number(favouriteProductData.price * (favouriteProductData.weight/1000.0)).toFixed(2);
        setValuePer100Units(roundedValue);
    }, [handleRemoveFavouriteClick]);

    const handleProductpageClick = (productID) => {
        openProductpage({productID});
    }
    const stopPropagation = (e) => {
        e.stopPropagation();
    };


    return (
        <div id="Productpage" onClick={() => handleProductpageClick(favouriteProductData.id)}>
            <div>
                <img className="ProductPageProductImage" src={favouriteProductData.productImage} alt={favouriteProductData.imageName}/>
                <br/>
                <img className="ProductPageSellerImage" src={favouriteProductData.sellerImage} alt={favouriteProductData.imageName}/>
            </div>
            <div onClick={stopPropagation}>
                <p onClick={handleRemoveFavouriteClick}>Remove from favourite</p>
            </div>

            <div>
                <h2>{favouriteProductData.name}</h2>
                <h2>Price: {favouriteProductData.price} zł</h2>
                <h3>Price per 100 {favouriteProductData.inGrams ? "g" : "ml"}: {valuePer100Units}</h3>
                <p>Seller {favouriteProductData.shopName}</p>
            </div>
            <p>weight {favouriteProductData.weight} {favouriteProductData.inGrams ? "g" : "ml"}</p>
            <p>fat {favouriteProductData.fat}</p>
            <p>carbs {favouriteProductData.carbs}</p>
            <p>fiber {favouriteProductData.fiber}</p>
            <p>salt {favouriteProductData.salt}</p>
            <p>protein {favouriteProductData.protein}</p>
            <ProductCompareToolbar/>
        </div>
    );
}

export default FavouriteProductElement;