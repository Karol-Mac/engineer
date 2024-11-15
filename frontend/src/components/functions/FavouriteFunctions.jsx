import axios from "axios";

export const FavouriteFunctions = () => {
    const saveFavouriteProduct = async({productID: productID})=>{
        let errorMessage;
        const AuthorizationToken = localStorage.getItem("accessToken");

        try {
            if(productID == null){
                errorMessage = "productID was not passed";
                return{ success: false, message: errorMessage};
            }

            let saveFavouriteProductURL= "http://localhost:8080/api/users/favorites?productId="+productID;

            await axios.post(saveFavouriteProductURL,null,{
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                }
            });

            console.log("product successfuly saved in favourite");
            return{ success: true};
        }catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ){
                errorMessage = error.response.data.message || "Unknown error";
            }else if(error.response){
                errorMessage = error.response;
            }

            console.log("product failed to be saved in favourite \"",errorMessage,"\"");
            return{ success: false, message: errorMessage};
        }

        console.log("Unknown error");
        return{ success: false, message: "Unknown error"};
    };

    const removeFavouriteProduct = async({productID: productID})=>{
        let errorMessage;
        const AuthorizationToken = localStorage.getItem("accessToken");

        try {
            if(productID == null){
                errorMessage = "productID was not passed";
                return{ success: false, message: errorMessage};
            }

            let removeFavouriteProductURL= "http://localhost:8080/api/users/favorites?productId="+productID;

            const response = await axios.delete(removeFavouriteProductURL,{
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                }
            });

            console.log("product successfuly removed from favourite");
            return{ success: true, message: response.data};
        }catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ){
                errorMessage = error.response.data.message || "Unknown error";
            }else if(error.response){
                errorMessage = error.response;
            }

            console.log("product failed to be deleted from favourites \"",errorMessage,"\"");
            return{ success: false, message: errorMessage};
        }
    };

    const getFavouriteProducts = async()=>{
        let errorMessage;
        const AuthorizationToken = localStorage.getItem("accessToken");
        console.log(AuthorizationToken);

        try {
            if(AuthorizationToken !== ""){
            let getFavouriteProductsURL= "http://localhost:8080/api/users/favorites";

            const response = await axios.get(getFavouriteProductsURL,{
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                }
            });

            const fechedFavouriteProducts = response.data;
            const removedProductsNames = fechedFavouriteProducts
                .filter(product => product.isHidden !== true)
                .map(product => product.name)

            if(removedProductsNames.isEmpty === false){
                const favouriteProducts = fechedFavouriteProducts.filter(product => product.isHidden !== true)
                return{ success: true, favouriteProducts: favouriteProducts, removedProductsName: removedProductsNames};
            }

            return{ success: true, favouriteProducts: fechedFavouriteProducts};
            }
        }catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ){
                errorMessage = error.response.data.message || "Unknown error";
            }else if(error.response){
                errorMessage = error.response;
            }

            return{ success: false, message: errorMessage};
        }
    };


    return {
        saveFavouriteProduct,
        removeFavouriteProduct,
        getFavouriteProducts
    };
};

