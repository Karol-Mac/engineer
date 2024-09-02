import {NavigateFunctions} from "../functions/NavigateFunctions"
const Footer = () => {
    const {openContactpage} = NavigateFunctions();
    return (
        <div id="footer">
            <a href="" onClick={openContactpage} id="contactUs"> <h6>Contact us</h6> </a>
        </div>

    );

};

export default Footer;