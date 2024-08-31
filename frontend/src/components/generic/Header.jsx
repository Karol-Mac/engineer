//Jest to górny pasek zawierający logo, oraz przyciski do ulubionych produktów, logowania , rejesracji , profilu i wyświetlenia menu zarządzania profilu

import {useEffect, useSTate} from "react";

const Header = () => {

    useEffect(() => {
        const fetchLoginInformation = async () => {
            // try{
            //     const response = await fetch("http://localhost:8000/api/login");
            // }

        }
    }, []);


    return(
        <div>
            <img src="HeaderLogoImg.jpg" alt="HeaderLogoImg.jpg" id="HeaderLogoImg"/>



        </div>
    );
};

export default Header;