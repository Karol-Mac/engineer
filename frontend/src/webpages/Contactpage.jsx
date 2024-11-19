import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";

const Contactpage = () => {
    const pathToSocials = "/images/icons/socials/";

    return (
        <div>
            <Header />
            <div id="contactPageContent" className="container mt-5">
                <h2>Contact us via email or our socials</h2>
                <form onSubmit>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            name="lastName"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Your Message</label>
                        <textarea
                            id="message"
                            name="message"
                            className="form-control"
                            placeholder="Enter your message"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">
                            SUBMIT
                        </button>
                    </div>
                </form>
                <div id="socialIcons" className="mt-4">
                    <h3>Follow us:</h3>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="me-2">
                        {<img src={pathToSocials+"facebook.png"} alt="Facebook" />}
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="me-2">
                        <img src={pathToSocials+"linkedin.png"} alt="LinkedIn" />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="me-2">
                        <img src={pathToSocials+"youtube.png"} alt="YouTube" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="me-2">
                        <img src={pathToSocials+"instagram.png"} alt="Instagram" />
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Contactpage;