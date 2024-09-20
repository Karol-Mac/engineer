import axios from "axios";

export const SearchProductFunctions = () => {
    const getSearchedProducts = async({productName})=>{
        let errorMessage;
        try {
            if(productName == ""){
                errorMessage = "product name not given";
                return{ success: false, message: errorMessage};
            }

            // console.log("productName= " +productName);
            let getProductsByNameUrl= "http://localhost:8080/api/products?name="+productName;

            const response = await axios.get(getProductsByNameUrl);
            const products = response.data;
            // console.log("found "+JSON.stringify(products.length)+" items by name: at location :"+getProductsByNameUrl);

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

    const getProductInformation = async({productID})=>{
        let errorMessage;
        try {
            if(productID === ""){
                errorMessage = "product name not given";
                return{ success: false, message: errorMessage};
            }

            // console.log("productID= " +productID);
            let getProductsByIDUrl= "http://localhost:8080/api/products/"+productID;

            const response = await axios.get(getProductsByIDUrl);
            const product = response.data;
            // console.log("found "+JSON.stringify(product.length)+" items by ID: at location :"+getProductsByIDUrl);

            if(product == null){
                errorMessage = "No product with given ID found";
                return{ success: false, message: errorMessage};
            }

            if(product.isHidden === true){
                errorMessage = "Found product with given ID is hidden";
                return{ success: false, message: errorMessage, isHidden: product.isHidden};
            }

            return{ success: true, productDetails: product};
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

    //last 10 products
    const getLatestProducts = async() => {
        let errorMessage;
        try {
            let getLatestProductsByNameUrl= "http://localhost:8080/api/products?name=";

            const response = await axios.get(getLatestProductsByNameUrl);
            let products = response.data;
            // console.log("found "+JSON.stringify(products.length)+" items by name: at location :"+getLatestProductsByNameUrl);

            if(products.length <= 0){
                errorMessage = "No product were found";
                return{ success: false, message: errorMessage};
            }

            products = products.filter(product => product.isHidden !== true);
            products = products.sort((dateA,dateB) => new Date(dateB.updatedAt) - new Date(dateA.updatedAt));

            if(products.length > 10){
                products.splice(0,10);
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
    }

    return {
        getSearchedProducts,
        getLatestProducts,
        getProductInformation,
    };
};

