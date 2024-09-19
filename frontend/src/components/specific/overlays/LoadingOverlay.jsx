const LoadingOverlay = () => {

    const loadSpinnerImage = "/animations/spinnerLoader.svg";

    return(
        <div id="LoadingOverlayID">
            <img src={loadSpinnerImage} alt="loadSpinnerImage"/>
        </div>

    );
};

export default LoadingOverlay;