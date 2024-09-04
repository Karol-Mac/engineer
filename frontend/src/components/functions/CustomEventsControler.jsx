export const CustomEventsControler = () => {


    //Event który zostaje odpalony w momencie dodania nowego lub usuniecia starego produtku z porównywarki
    const onCompareUpdate = new Event("onCompareUpdate");
    const invokeOnCompareUpdateEvent = () => {
        window.dispatchEvent(onCompareUpdate);
    }

    const addListenerDispatchOnCompareUpdate = (functionParam) => {
        window.addEventListener("onCompareUpdate", functionParam);
    };

    const removeListenerDispatchOnCompareUpdate = (functionParam) => {
        window.removeEventListener("onCompareUpdate", functionParam);
    };

    return {
        invokeOnCompareUpdateEvent,
        addListenerDispatchOnCompareUpdate,
        removeListenerDispatchOnCompareUpdate
    };
};