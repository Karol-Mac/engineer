import { useState } from "react";
import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import styles from "../css/Contactpage.module.css";

const Contactpage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResponseMessage("");

        try {
            const response = await fetch("http://localhost:8080/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setResponseMessage("Message sent successfully!");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    message: "",
                });
            } else {
                const errorData = await response.json();
                setResponseMessage(
                    errorData.message || "Failed to send the message. Please try again."
                );
            }
        } catch (error) {
            setResponseMessage("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <div id="contactPageContent" className="container mt-5">
                    <h2>Contact us via email or our socials!!!</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="form-control"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={handleChange}
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
                                value={formData.email}
                                onChange={handleChange}
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
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? "Sending..." : "SUBMIT"}
                            </button>
                        </div>
                    </form>
                    {responseMessage && (
                        <div className={`mt-3 alert ${responseMessage.includes("success") ? "alert-success" : "alert-danger"}`}>
                            {responseMessage}
                        </div>
                    )}
                    <div className={`${styles.socialIcons} mt-4`}>
                        <h3>Follow us:</h3>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src="/images/socials/facebook.png" alt="Facebook" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <img src="/images/socials/linkedin.png" alt="LinkedIn" />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <img src="/images/socials/youtube.png" alt="YouTube" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src="/images/socials/instagram.png" alt="Instagram" />
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contactpage;