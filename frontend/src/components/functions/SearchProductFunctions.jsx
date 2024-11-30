import axios from "axios";
import {useState} from "react";

export const SearchProductFunctions = () => {
    const BATCHSIZE = {
                TEN: 3,
                FIFTEEN: 5,
                TWENTY: 10,
    };

    const [currentSearchBatch, setCurrentSearchBatch] = useState(BATCHSIZE.TEN);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesNumber, setPagesNumber] = useState(1);

    const getSearchedProducts = async({productName})=>{
        let errorMessage;
        try {

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
            let getLatestProductsByNameUrl= `http://localhost:8080/api/products?name=&pageNo=0&pageSize=10&sortBy=updatedAt&direction=desc`;

            const response = await axios.get(getLatestProductsByNameUrl);
            let products = response.data.products;
            
            console.log("Latestproducts: "+JSON.stringify(response.data)+ "product len" + products.length);

            if(products.length <= 0){
                errorMessage = "No product were found";
                return{ success: false, message: errorMessage};
            }

            console.log("items before filtering "+JSON.stringify(products) + " items before filtering");
            products = products.filter(product => product.isHidden !== true);
            console.log("items after filtering "+JSON.stringify(products) + " items after filtering");
            products = products.sort((dateA,dateB) => new Date(dateB.updatedAt) - new Date(dateA.updatedAt));
            console.log("items after sorting "+JSON.stringify(products) + " items after sorting");

            if (products.length > 10) {
                products = products.slice(0, 10);
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

    const getSellerData = async({sellerID}) =>{
        let errorMessage;
        try {
            let getSellerNameUrl= "http://localhost:8080/api/accounts/"+sellerID;

            const response = await axios.get(getSellerNameUrl);

            return{ success: true, sellerData: response.data};
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

    const deleteProduct = async(productID) =>{
        let errorMessage;
        try {
            const AuthorizationToken = localStorage.getItem("accessToken");

            let deleteProduct= "http://localhost:8080/api/products/"+productID;

            const {data: res} = await axios.delete(deleteProduct, null, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`,
                },
            });

            if(res == null){
                errorMessage = "No product with given ID found to be deleted";
                return{ success: false, message: errorMessage};
            }

            return { success: true,  message: "Product deleted"};

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

    const getBatchSize = () => {
        return BATCHSIZE;
    }

    const getCurrentBatchSize = () => {
        return currentSearchBatch;
    }

    const getCurrentPage = () => {
        return currentPage;
    }

    const setCurrentPageNumer = (newPage) => {
        if(newPage > 0 && newPage <= pagesNumber){
            setCurrentPage(newPage);
        }else{
            console.log("Given page number is out of range");
        }
    }

    const isValidBatchsize = (testBatch) =>{
        return Object.values(BATCHSIZE).includes(testBatch)
    }

    const setBatchSize = (newBatch) => {
        if(isValidBatchsize(newBatch)){
            setCurrentSearchBatch(newBatch);
            setCurrentPage(1);
        }else{
            console.log("Given batch isn't valid");
        }
    }

    const countPageNumber = (foundProducts) =>{
        if(foundProducts == null){
            console.log("Found products are null perhaps you didn't find any products");
            setPagesNumber(1);
        }else{
            const pageCount = Math.ceil(foundProducts.length / currentSearchBatch);
            setPagesNumber(pageCount);
        }
    }

    const getPagesNumber = () => {
        return pagesNumber;
    }


    return {
        getSearchedProducts,
        getLatestProducts,
        getProductInformation,
        getSellerData,

        setBatchSize,
        getBatchSize,
        getCurrentBatchSize,
        countPageNumber,
        getCurrentPage,
        getPagesNumber,
        setCurrentPageNumer,

        deleteProduct

    };
};

