import { SearchProductFunctions } from "../../functions/SearchProductFunctions";
import styles from "../../../css/PageButton.module.css";

function PageButton({ pageNumber, onClick, currentPage }) {
    const { setCurrentPageNumer } = SearchProductFunctions();

    const handleClick = () => {
        onClick(pageNumber);
    };

    // Sprawdza, czy dany przycisk jest aktywny
    const isActive = currentPage === pageNumber;

    return (
        <div className={styles.pageButtonContainer}>
            <div
                onClick={handleClick}
                className={`${styles.pageButton} ${isActive ? styles.active : ""}`}
            >
                {pageNumber}
            </div>
        </div>
    );
}

export default PageButton;
