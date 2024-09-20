import axios from "axios";

export const SellerAccountFunctions = () => {
    const getSellerInformation = async({sellerID})=>{
        let errorMessage;
        try {
            if(sellerID === ""){
                errorMessage = "sellerID not given";
                return{ success: false, message: errorMessage};
            }

            // console.log("productID= " +sellerID);
            let getSellerByIDUrl= "http://localhost:8080/api/accounts/"+sellerID;

            const response = await axios.get(getSellerByIDUrl);
            const seller = response.data;
            // console.log("found "+JSON.stringify(seller.length)+" items by ID: at location :"+getSellerByIDUrl);

            if(seller == null){
                errorMessage = "No product with given ID found";
                return{ success: false, message: errorMessage};
            }

            if(seller.isDeleted === true){
                errorMessage = "Found product with given ID is hidden";
                return{ success: false, message: errorMessage};
            }

            return{ success: true, sellerDetails: seller};
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
        getSellerInformation,
    };
};

