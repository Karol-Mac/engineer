export const CustomEventsControler = () => {

    const onCompareUpdate = "onCompareUpdate";
    //Event który zostaje odpalony w momencie dodania nowego lub usuniecia starego produtku z porównywarki
    const onCompareUpdateEvent = new Event("onCompareUpdate");
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

    return {
        invokeOnCompareUpdateEvent,
        addListenerDispatchOnCompareUpdate,
        removeListenerDispatchOnCompareUpdate,

        invokeReportOverlayEvent,
        addListenerLoadReportOverlay,
        removeListenerLoadReportOverlay,


    };
};