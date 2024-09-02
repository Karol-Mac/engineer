export const CompareFunctions = () => {
    const localStorageItemName = "compareProductList";


    const initializeProductComparisonList = () => {
        const existingComparisonList = localStorage.getItem(localStorageItemName);

        if(!existingComparisonList){
            localStorage.setItem("compareProductList", JSON.stringify([]));
        }
    };
    initializeComparisonList();

    const addProductComparisonList = (givenProductID) => {
        const existingComparisonList = JSON.parse(localStorage.getItem(localStorageItemName));

        if(existingComparisonList.inclues(givenProductID)){
            existingComparisonList.push(givenProductID);

            localStorage.setItem(localStorageItemName, JSON.stringify(existingComparisonList));
            console.log("Added product with ID" + givenProductID + "to be compared");
        }else{
            console.log("product with ID" + givenProductID + " is already compared");
        }
    }

    const removeProductComparisonList = (givenProductID) => {
        const existingComparisonList = JSON.parse(localStorage.getItem(localStorageItemName));

        const productIndex = existingComparisonList.indexOf(givenProductID);
        if(productIndex > 0){
            existingComparisonList.splice(givenProductID,1);

            localStorage.setItem(localStorageItemName, JSON.stringify(existingComparisonList));
            console.log("Removed product with ID" + givenProductID + "from comparison");
        }else{
            console.log("product with ID" + givenProductID + " doesnt exist and therefore cannot be removed");
        }
    }

    const toggleProductInComparisonList = (givenProductID) => { //if doesnt work check if React. Strict mode doesnt mess it up
        const existingComparisonList = JSON.parse(localStorage.getItem(localStorageItemName));

        const productIndex = existingComparisonList.indexOf(givenProductID);
        if(productIndex > 0){
            existingComparisonList.splice(givenProductID,1);

            localStorage.setItem(localStorageItemName, JSON.stringify(existingComparisonList));
            console.log("TOOGLED: Removed product with ID" + givenProductID + "from comparison");
        }else{existingComparisonList.push(givenProductID);

            localStorage.setItem(localStorageItemName, JSON.stringify(existingComparisonList));
            console.log("TOOGLED: Added product with ID" + givenProductID + "to be compared");

        }
    }

    return {
        initializeProductComparisonList, //don't think it should really be used outside but just in case it is shared
        addProductComparisonList,
        removeProductComparisonList,
        toggleProductInComparisonList
    };
};