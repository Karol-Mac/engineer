import {NavigateFunctions} from "../functions/NavigateFunctions"
import CompareProductsButton from "./CompareProductsButton";

// import "../../css/generalVisuals.css";
import styles from "../../css/Footer.module.css";

const Footer = () => {
    const { openContactpage } = NavigateFunctions();
    return (
        <footer className="bg-light text-center py-3 mt-auto">
            <div className={styles.footerContainer}>
                <p>Got Questions? <span>+48 123 123 133</span></p>
                <div className="footerLinks">
                    <a onClick={openContactpage} className={`text-primary me-3 ${styles.footerLink}`}>Contact Us</a>
                    <a onClick={openContactpage} className={`text-primary ${styles.footerLink}`}>Terms of Service</a>
                </div>
            </div>
        </footer>
    );

};
export default Footer;