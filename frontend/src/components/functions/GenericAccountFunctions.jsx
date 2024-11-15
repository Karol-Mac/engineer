import axios from "axios";

export const GenericAccountFunctions = () => {

    const updateAccount = async(e, newCredential) => {
        e.preventDefault();


    }

    const addNewProduct = async(e, newProductData, newProductImage)=>{
        e.preventDefault();

        const formData = new FormData();
        const AuthorizationToken = localStorage.getItem("accessToken");
        const modifiedProductData = {
            ...newProductData,
            name: newProductData.productName,
        };
        delete modifiedProductData.productName;

        console.log("add mod product: ",modifiedProductData);

        try {
            let addNewProductUrl = "http://localhost:8080/api/products";
            console.log("mod Product data: ",modifiedProductData);
            // formData.append('fresh_product', newProductData, {type: 'application/json'});
            formData.append('product', new Blob([JSON.stringify(modifiedProductData)], { type: 'application/json' }));
            formData.append("file", newProductImage);

            const res = await axios.post(addNewProductUrl, formData, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                    // 'Content-Type': 'multipart/form-data',
                }
            });
            // const freshproduct = res.data.FRESH_PRODUCT;

            console.log("Product has been added \""+res.data.message+"\"");
            return{ success: true};
        }catch (error){
            let errorMessage;
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                errorMessage = error.response.data.message || "Unknown error";
            }

            // console.log("(Company) setResponseMessage: "+ errorMessage);
            return{ success: false, message: errorMessage};
        }
    }

    return {
        getSellerInformation,
        addNewProduct
    };
};

