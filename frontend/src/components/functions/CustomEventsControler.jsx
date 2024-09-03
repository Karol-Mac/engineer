export const CustomEventsControler = () => {
    const onCompareUpdate = new Event("onCompareUpdate");
    const dispatchOnCompareUpdate = () => {
        window.dispatchEvent(onCompareUpdate);
    }

    return {
        dispatchOnCompareUpdate,
    };
};