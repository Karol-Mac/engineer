import {NavigateFunctions} from "../functions/NavigateFunctions"
import CompareProductsButton from "./CompareProductsButton";

// import "../../css/generalVisuals.css";
import styles from "../../css/Footer.module.css";

const Footer = () => {
    const {openContactpage} = NavigateFunctions();
    return (
        <div id="footer">
            <div className={styles.footer}>
                <p>Got Questions? <span>+48 123 123 133</span></p>
                <div className="footerLinks">
                    <h6 onClick={openContactpage} className={styles.footerLink}>Contact Us</h6>
                    <h6 onClick={openContactpage} className={styles.footerLink}>Terms of Service</h6>
                </div>
            </div>
        </div>
    );

};

export default Footer;