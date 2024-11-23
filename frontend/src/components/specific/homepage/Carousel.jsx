import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from "../../../css/Carousel.module.css";

function Carousel() {
    const carouselImages = [
        "/images/carousel/Karuzela1.png",
        "/images/carousel/Karuzela2.png",
        "/images/carousel/Karuzela3.png",
    ];

    return (
        <div
            id="homepageCarousel"
            className={`carousel slide ${styles.carouselContainer}`} // Added custom container class
            data-bs-ride="carousel"
        >
            <div className={`carousel-indicators ${styles.carouselIndicators}`}>
                {carouselImages.map((_, index) => (
                    <button
                        type="button"
                        key={index}
                        data-bs-target="#homepageCarousel"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            <div className={`carousel-inner ${styles.carouselInner}`}>
                {carouselImages.map((image, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""} ${styles.carouselItem}`}
                    >
                        <img
                            src={image}
                            className={`d-block w-100 ${styles.carouselImage}`}
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            <button
                className={`carousel-control-prev ${styles.carouselControl}`}
                type="button"
                data-bs-target="#homepageCarousel"
                data-bs-slide="prev"
            >
                <span
                    className={`carousel-control-prev-icon ${styles.carouselControlIcon}`}
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className={`carousel-control-next ${styles.carouselControl}`}
                type="button"
                data-bs-target="#homepageCarousel"
                data-bs-slide="next"
            >
                <span
                    className={`carousel-control-next-icon ${styles.carouselControlIcon}`}
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;
