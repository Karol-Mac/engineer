import {NavigateFunctions} from "../functions/NavigateFunctions"
import AddCompareButton from "./AddCompareButton";
import CompareProductsButton from "./CompareProductsButton";
const Footer = () => {
    const {openContactpage} = NavigateFunctions();
    return (
        <div id="footer">
            <div onClick={openContactpage} id="contactUs">
                <h6>Contact us</h6>
            </div>
            <CompareProductsButton givenProductID={11}/>{/* for tests */}
        </div>
    );

};

export default Footer;