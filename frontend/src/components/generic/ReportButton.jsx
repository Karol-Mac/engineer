import {ReportFunctions} from "../functions/ReportFunctions"
import {CustomEventsControler} from "../functions/CustomEventsControler";
import {NavigateFunctions} from "../functions/NavigateFunctions";
import {LoginFunctions} from "../functions/LoginFunctions";

const ReportButton = ({reportType, givenReportedID}) => {
    const { checkReportTypeProduct,reportComment,reportProduct } = ReportFunctions();
    const {invokeReportOverlay} = CustomEventsControler();
    const {openRaportpage,openLoginpage} = NavigateFunctions();
    const {isUserLogged} = LoginFunctions();


    const handleClick = () => {
        if(isUserLogged()){
            openRaportpage(reportType, givenReportedID);
        }else{
            openLoginpage();
        }

        // if(checkReportTypeProduct(reportType)){
        //     // invokeReportOverlay(givenReportedID, true);
        //     reportProduct(givenReportedID); // Open reportOverlay and pass reportType. that component will be able to get text and pass it to specific report function
        // }else{
        //     // invokeReportOverlay(givenReportedID, false);
        //
        //     reportComment(givenReportedID); // Open reportOverlay
        // }

    };

    return (
        // <button onClick={handleClick} id="CompareImg">
        //     <img src="CompareLogoImg.jpg" alt="CompareLogoImg" id="CompareLogoImg2" />
        // </button>

        // <span onClick={handleClick} id="CompareImg">
        //     <img src="CompareLogoImg.jpg" alt="CompareLogoImg" id="CompareLogoImg2" />
        // </span>

        // <div id="ReportDiv" onClick={handleClick} >
        <div id="ReportDiv">
            <button onClick={handleClick} >REPORT</button>
            {/*<img src="ReportLogoImg.jpg" alt="ReportLogoImg" id="ReportLogoImg" />*/}
        </div>


    );
};

export default ReportButton;
