import {NavigateFunctions} from "../../functions/NavigateFunctions";
import {SearchProductFunctions} from "../../functions/SearchProductFunctions";

function BatchSizeButton ({batchsize, onClick}) {
    const {setBatchSize, getBatchSize} = SearchProductFunctions();
    const {refreshPage} = NavigateFunctions();

    const handleClick = () =>{
        onClick(batchsize);
    }

    return (
        <div>
            <div onClick={handleClick}><p>{batchsize}</p></div>
        </div>
    );


}

export default BatchSizeButton;