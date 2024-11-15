import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";

const Contactpage = () => {
    const pathToSocials = "/images/icons/socials/";

    return (
        <div>
            <Header />
            <div id="contactPageContent">
                <h2>Contact us via email or our socials</h2>
                <form onSubmit>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message">Your Message</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Enter your message"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">
                            SUBMIT
                        </button>
                    </div>
                </form>
                <div id="socialIcons">
                    <h3>Follow us:</h3>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        {<img src={pathToSocials+"facebook.png"} alt="Facebook" />}
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={pathToSocials+"linkedin.png"} alt="LinkedIn" />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <img src={pathToSocials+"youtube.png"} alt="YouTube" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={pathToSocials+"instagram.png"} alt="Instagram" />
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Contactpage;