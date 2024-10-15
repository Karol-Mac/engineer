import {NavigateFunctions} from "../functions/NavigateFunctions"
import CompareProductsButton from "./CompareProductsButton";

import "../../css/generalVisuals.css";

const Footer = () => {
    const {openContactpage} = NavigateFunctions();
    return (
        <div id="footer">
            <div className="footerContent">
                <p>Got Questions? <span>+48 123 123 133</span></p>
                <div className="footerLinks">
                    <h6 onClick={openContactpage} className="footerLink">Contact Us</h6>
                    <h6 onClick={openContactpage} className="footerLink">Terms of Service</h6>
                </div>

            {/*<CompareProductsButton givenProductID={11}/>/!* for tests *!/*/}
            </div>
        </div>
    );

};

export default Footer;