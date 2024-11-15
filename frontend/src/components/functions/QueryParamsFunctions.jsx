export const QueryParamsFunctions = () => {
    const getSearchedProductName = (URLSearchParams) => {
        return URLSearchParams.get("string"); //returns name of the searched product from query params
    }

    return {
        getSearchedProductName,
    };
};

