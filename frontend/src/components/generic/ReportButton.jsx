import { CompareFunctions } from "../functions/CompareFunctions";
import {ReportFunctions} from "../functions/ReportFunctions"
import {CustomEventsControler} from "../functions/CustomEventsControler";

const ReportButton = (givenReportedID, reportType) => {
    const { checkReportTypeProduct,reportComment,reportProduct } = ReportFunctions();
    const {invokeReportOverlay} = CustomEventsControler();


    const handleClick = () => {
        if(checkReportTypeProduct(reportType)){
            invokeReportOverlay(givenReportedID, true);
            // reportProduct(givenReportedID); // Open reportOverlay and pass reportType. that component will be able to get text and pass it to specific report function
        }else{
            invokeReportOverlay(givenReportedID, false);
            // reportComment(givenReportedID); // Open reportOverlay
        }

    };

    return (
        // <button onClick={handleClick} id="CompareImg">
        //     <img src="CompareLogoImg.jpg" alt="CompareLogoImg" id="CompareLogoImg2" />
        // </button>

        // <span onClick={handleClick} id="CompareImg">
        //     <img src="CompareLogoImg.jpg" alt="CompareLogoImg" id="CompareLogoImg2" />
        // </span>

        <div onClick={handleClick} id="ReportDiv">
            <img src="ReportLogoImg.jpg" alt="ReportLogoImg" id="ReportLogoImg" />
        </div>


    );
};

export default ReportButton;
