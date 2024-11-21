import {NavigateFunctions} from "../../functions/NavigateFunctions";
import {SearchProductFunctions} from "../../functions/SearchProductFunctions";
import styles from "../../../css/PageButton.module.css";

function PageButton ({pageNumber, onClick}) {
    const {setCurrentPageNumer} = SearchProductFunctions();
    const {RefreshPage} = NavigateFunctions();

    const handleClick = () =>{
        onClick(pageNumber);
    }

    return (
        <div className={styles.pageButtonContainer}>
            <div onClick={handleClick} className={styles.pageButton}>
                {pageNumber}
            </div>
        </div>
    );


}

export default PageButton;