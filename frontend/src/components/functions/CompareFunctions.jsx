import {CustomEventsControler} from "./CustomEventsControler";

export const CompareFunctions = () => {
    const {invokeOnCompareUpdateEvent} = CustomEventsControler();
    const localStorageCompareProductList = "compareProductList";


    const initializeProductComparisonList = () => {
        const existingComparisonList = localStorage.getItem(localStorageCompareProductList);

        if (!existingComparisonList) {
            localStorage.setItem("compareProductList", JSON.stringify([]));
        }
    };
    initializeProductComparisonList();

    const addProductComparisonList = ({givenProductID}) => {
        const currentList = JSON.parse(localStorage.getItem("compareProductList")) || [];
        console.log("Before Adding:", currentList);

        if (!currentList.includes(givenProductID)) {
            currentList.push(givenProductID);
            localStorage.setItem("compareProductList", JSON.stringify(currentList));
            console.log("After Adding:", currentList);
        } else {
            console.log(`Product with ID ${givenProductID} is already in the comparison list`);
        }
    };

    const removeProductComparisonList = (givenProductID) => {
        const currentList = JSON.parse(localStorage.getItem("compareProductList")) || [];
        console.log("Before Removing:", currentList);

        if (currentList.includes(givenProductID)) {
            const updatedList = currentList.filter((id) => id !== givenProductID);
            localStorage.setItem("compareProductList", JSON.stringify(updatedList));
            console.log("After Removing:", updatedList);
        } else {
            console.log(`Product with ID ${givenProductID} doesn't exist and therefore cannot be removed`);
        }
    };

    const toggleProductInComparisonList = (givenProductID) => {
        const existingComparisonList = JSON.parse(localStorage.getItem(localStorageCompareProductList));
        const productIndex = existingComparisonList.findIndex((obj) => obj === givenProductID);

        if (productIndex >= 0) {
            existingComparisonList.splice(existingComparisonList.indexOf(givenProductID), 1);
            localStorage.setItem(localStorageCompareProductList, JSON.stringify(existingComparisonList));
            invokeOnCompareUpdateEvent();
        } else {
            existingComparisonList.push(givenProductID);
            localStorage.setItem(localStorageCompareProductList, JSON.stringify(existingComparisonList));
            invokeOnCompareUpdateEvent();
        }
    }

    const isAnyProductToCompareSelected = () => {
        const areProductsToCompare = JSON.parse(localStorage.getItem(localStorageCompareProductList));
        console.log(areProductsToCompare);
        return Object.keys(areProductsToCompare).length ? true : false;
    }

    const isSpecificProductSelectedToCompare = (givenProductID) => {
        console.log("givenProductID: ", givenProductID);
        const existingComparisonList = JSON.parse(localStorage.getItem(localStorageCompareProductList)) || [];
        return existingComparisonList.includes(givenProductID);
    };

    const isSpecificProductSelectedAsFavourite = (givenProductID) => {
        //FIX
    }


    return {
        initializeProductComparisonList,
        addProductComparisonList,
        removeProductComparisonList,
        toggleProductInComparisonList,
        isAnyProductToCompareSelected,
        isSpecificProductSelectedToCompare,
    };
};