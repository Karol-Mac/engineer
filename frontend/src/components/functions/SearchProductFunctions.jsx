import axios from "axios";

export const SearchProductFunctions = () => {
    const getSearchedProducts = async({productName})=>{
        let errorMessage;
        try {
            if(productName == ""){
                errorMessage = "product name not given";
                return{ success: false, message: errorMessage};
            }
            
            console.log("productName= " +productName);
            let getProductsByNameUrl= "http://localhost:8080/api/products?name="+productName;

            const response = await axios.get(getProductsByNameUrl);
            const products = response.data;
            console.log("found "+JSON.stringify(products.length)+"items by name: at location :"+getProductsByNameUrl);

            if(products.length <= 0){
                errorMessage = "No product with similar name found";
                return{ success: false, message: errorMessage};
            }

            return{ success: true, foundProducts: products};
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
        getSearchedProducts,
    };
};

