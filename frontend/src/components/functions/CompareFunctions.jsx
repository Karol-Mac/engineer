import {CustomEventsControler} from "./CustomEventsControler";

export const CompareFunctions = () => {
    const {invokeOnCompareUpdateEvent} = CustomEventsControler();
    const localStorageCompareProductList = "compareProductList";


    const initializeProductComparisonList = () => {
        const existingComparisonList = localStorage.getItem(localStorageCompareProductList);

        if(!existingComparisonList){
            localStorage.setItem("compareProductList", JSON.stringify([]));
        }
    };
    initializeProductComparisonList();

    const addProductComparisonList = ({givenProductID}) => { //to be updated
        const existingComparisonList = JSON.parse(localStorage.getItem(localStorageCompareProductList));

        if(existingComparisonList.inclues(givenProductID)){
            existingComparisonList.push(givenProductID);
            invokeOnCompareUpdateEvent();
            localStorage.setItem(localStorageCompareProductList, JSON.stringify(existingComparisonList));
            // console.log("Added product with ID" + givenProductID + "to be compared");
        }else{
            console.log("product with ID" + givenProductID + " is already compared");
        }
    }

    const removeProductComparisonList = (givenProductID) => { //to be updated
        const existingComparisonList = JSON.parse(localStorage.getItem(localStorageCompareProductList));

        const productIndex = existingComparisonList.indexOf(givenProductID);
       if(productIndex > 0){
            existingComparisonList.splice(givenProductID,1);
            invokeOnCompareUpdateEvent();
            localStorage.setItem(localStorageCompareProductList, JSON.stringify(existingComparisonList));
            // console.log("Removed product with ID" + givenProductID + "from comparison");
        }else{
            console.log("product with ID" + givenProductID + " doesnt exist and therefore cannot be removed");
        }
    }

    const toggleProductInComparisonList = (givenProductID) => { //if doesnt work check if React. Strict mode doesnt mess it up
        const existingComparisonList = JSON.parse(localStorage.getItem(localStorageCompareProductList));
        const productIndex = existingComparisonList.findIndex((obj) => obj ===givenProductID);
        // console.log("product index for givenProductID("+givenProductID+") ==" + productIndex);

        if(productIndex >= 0){
            existingComparisonList.splice(existingComparisonList.indexOf(givenProductID),1);
            localStorage.setItem(localStorageCompareProductList, JSON.stringify(existingComparisonList));
            invokeOnCompareUpdateEvent();

            // console.log("TOOGLED: Removed product with ID" + givenProductID + "from comparison");
        }else{existingComparisonList.push(givenProductID);
            localStorage.setItem(localStorageCompareProductList, JSON.stringify(existingComparisonList));
            invokeOnCompareUpdateEvent();

            // console.log("TOOGLED: Added product with ID" + givenProductID + "to be compared");
        }
    }

    const isAnyProductToCompareSelected = () => {
        const areProductsToCompare = JSON.parse(localStorage.getItem(localStorageCompareProductList));
        console.log(areProductsToCompare);
        return Object.keys(areProductsToCompare).length ? true : false;
    }

    const isSpecificProductSelectedToCompare = (givenProductID) => {
        // console.log("givenProductID "+givenProductID);
        const productId = typeof givenProductID === 'object' ? givenProductID.givenProductID : givenProductID;
        const existingComparisonList = JSON.parse(localStorage.getItem(localStorageCompareProductList));
        // console.log("productID "+productId + ", existingComparisonList"+ existingComparisonList);
        const productIndex = existingComparisonList.findIndex(obj => obj.givenProductID===productId);
        return productIndex === -1 || productIndex === null ? false : true;
    }

    const isSpecificProductSelectedAsFavourite = (givenProductID) => {
        //FIX
    }


    return {
        initializeProductComparisonList, //don't think it should really be used outside but just in case it is shared
        addProductComparisonList,
        removeProductComparisonList,
        toggleProductInComparisonList,
        isAnyProductToCompareSelected,
        isSpecificProductSelectedToCompare,
    };
};