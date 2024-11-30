export const CustomEventsControler = () => {

    const onCompareUpdate = "onCompareUpdate";
    //Event który zostaje odpalony w momencie dodania nowego lub usuniecia starego produtku z porównywarki
    const onCompareUpdateEvent = new Event(onCompareUpdate);
    const invokeOnCompareUpdateEvent = () => {
        window.dispatchEvent(onCompareUpdateEvent);
    }

    const addListenerDispatchOnCompareUpdate = (functionParam) => {
        window.addEventListener(onCompareUpdate, functionParam);
    };

    const removeListenerDispatchOnCompareUpdate = (functionParam) => {
        window.removeEventListener(onCompareUpdate, functionParam);
    };


    const onLoadReportOverlay = "onLoadReportOverlay";
    const onLoadReportOverlayEvent = (givenReportedID, isReportTypeProduct) => {
        return new CustomEvent(onLoadReportOverlay,{
            reportDetail: {givenReportedID, isReportTypeProduct},
        });
    }
    const invokeReportOverlayEvent = (givenReportedID, isReportTypeProduct) => {
        const onLoadReportOverlayEventInstance = onLoadReportOverlayEvent(givenReportedID, isReportTypeProduct);
        window.dispatchEvent(onLoadReportOverlayEventInstance);
    }

    const addListenerLoadReportOverlay = (functionParam) => {
        window.addEventListener(onLoadReportOverlay, functionParam);
    };

    const removeListenerLoadReportOverlay = (functionParam) => {
        window.removeEventListener(onLoadReportOverlay, functionParam);
    };




    const onLoadingProducts = "onLoadingProducts";
    const onLoadingProductsEvent = new Event(onLoadingProducts);
    const invokeOnLoadingProducts = () => {
        window.dispatchEvent(onLoadingProductsEvent);
    }

    const addListenerOnLoadingProducts = (functionParam) => {
        window.addEventListener(onLoadingProducts, functionParam);
    };

    const removeListenerOnLoadingProducts = (functionParam) => {
        window.removeEventListener(onLoadingProducts, functionParam);
    };

    const onLogingIn = "onLogingIn";
    const onLogingInEvent = new Event(onLogingIn);

    const invokeOnLogingIn = () => {
        window.dispatchEvent(onLogingInEvent);
    };

    const addListenerOnLogingIn = (callback) => {
        window.addEventListener(onLogingIn, callback);
    };

    const removeListenerOnLogingIn = (callback) => {
        window.removeEventListener(onLogingIn, callback);
    };


    return {
        invokeOnCompareUpdateEvent,
        addListenerDispatchOnCompareUpdate,
        removeListenerDispatchOnCompareUpdate,

        invokeReportOverlayEvent,
        addListenerLoadReportOverlay,
        removeListenerLoadReportOverlay,

        invokeOnLoadingProducts,
        addListenerOnLoadingProducts,
        removeListenerOnLoadingProducts,

        invokeOnLogingIn,
        addListenerOnLogingIn,
        removeListenerOnLogingIn,
    };
};