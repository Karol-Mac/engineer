import {NavigateFunctions} from "../functions/NavigateFunctions"
import AddCompareButton from "./AddCompareButton";
const Footer = () => {
    const {openContactpage} = NavigateFunctions();
    return (
        <div id="footer">
            <a href="" onClick={openContactpage} id="contactUs"> <h6>Contact us</h6> </a>
            <AddCompareButton givenProductID={11}/>{/* for tests */}
        </div>
    );

};

export default Footer;