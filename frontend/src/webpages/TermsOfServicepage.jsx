import Header from "../components/generic/Header";
import styles from "../css/TermsOfServicepage.module.css";
import Footer from "../components/generic/Footer";

const TermsOfServicepage = () => {

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header/>
            <div className={styles.tosContainer}>
            <h5>
                <b>
                    1. Usage: By using this service, you agree to comply with all applicable laws and our guidelines.
                </b>
            </h5>
            <h5>
                <b>
                    2. Content: We are not responsible for user-generated content; users must ensure it is lawful.
                </b>
            </h5>
            <h5>
                <b>
                    3. Liability: We are not liable for damages arising from the use of this service.
                </b>
            </h5>
            <h5>
                <b>
                    4. Changes: We reserve the right to modify these terms at any time without prior notice.
                </b>
            </h5>
            </div>

            <Footer/>
        </div>

    );

};

export default TermsOfServicepage;