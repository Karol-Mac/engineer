
import {SearchProductFunctions} from "../../functions/SearchProductFunctions";
import styles from "../../../css/BatchSizeButton.module.css";

function BatchSizeButton({ batchsize, onClick, currentBatchSize }) {
    // Sprawdza, czy przycisk jest aktywny
    const isActive = currentBatchSize === batchsize;

    const handleClick = () => {
        onClick(batchsize); // Wywołuje funkcję onClick przekazaną z `Searchpage`
    };

    return (
        <div
            className={`${styles.batchSizeButton} ${isActive ? styles.active : ""}`}
            onClick={handleClick}
        >
            {batchsize}
        </div>
    );
}

export default BatchSizeButton;