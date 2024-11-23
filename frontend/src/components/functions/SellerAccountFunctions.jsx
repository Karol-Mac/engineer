import axios from "axios";

export const SellerAccountFunctions = () => {
    const getSellerInformation = async({sellerID})=>{
        let errorMessage;
        try {
            if(sellerID === ""){
                errorMessage = "sellerID not given";
                return{ success: false, message: errorMessage};
            }

            console.log("productID= " +sellerID);
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

    const getSellerProducts = async() => {
        let errorMessage;
        try {
            let getSellerProducts= "http://localhost:8080/api/products/seller";
            const AuthorizationToken = localStorage.getItem("accessToken");
            console.log("TTTT1");
            console.log("AuthorizationToken:", AuthorizationToken);
            const response = await axios.get(getSellerProducts, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                }
            });
            console.log("TTTT2");
            let products = response.data;

            if(products.length <= 0){
                errorMessage = "No product were found";
                return{ success: false, message: errorMessage};
            }
            console.log("TTTT3");
            products = products.sort((dateA,dateB) => new Date(dateB.updatedAt) - new Date(dateA.updatedAt));
            console.log("TTTT4");
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

    const editProduct = async(e, newProductData) => {
        e.preventDefault();

        const formData = new FormData();
        const AuthorizationToken = localStorage.getItem("accessToken");
        const modifiedProductData = {
            ...newProductData,
            name: newProductData.productName,
        };
        delete modifiedProductData.productName;

        try {
            let editProductUrl = `http://localhost:8080/api/products/${newProductData.productID}`;
            formData.append('product', new Blob([JSON.stringify(modifiedProductData)], { type: 'application/json' }));

            const res = await axios.put(editProductUrl, formData, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                }
            });

            return { success: true };
        } catch (error) {
            let errorMessage;
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                errorMessage = error.response.data.message || "Unknown error";
            }

            return { success: false, message: errorMessage };
        }
    };

    return {
        getSellerInformation,
        addNewProduct,
        getSellerProducts,
        editProduct
    };
};

