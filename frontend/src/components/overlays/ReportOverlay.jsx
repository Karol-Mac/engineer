import {CompareFunctions} from "../functions/CompareFunctions";
import {useEffect, useState} from "react";
import {CustomEventsControler} from "../functions/CustomEventsControler";
import {ReportFunctions} from "../functions/ReportFunctions";

const ReportOverlay = () => {
    const {reportProduct, reportComment } = ReportFunctions();
    const {addListenerLoadReportOverlay,removeListenerLoadReportOverlay} = CustomEventsControler();

    const [reportText, setReportText] = useState("");
    const [reportData, setReportData] = useState(null);

    var isLoggingToCompany = false;

    const handleChange = ({ currentTarget: input }) => {
        setReportText({ ...reportText, [input.name]: input.value });
    };

    const handleEventData = (event) => {
        const eventData = event.detail;
        setReportData(eventData);
        console.log("Data taken from custom event: "+eventData);
    };

    const sendReport = () => {
        if(reportData != null){
            if(reportData.isReportTypeProduct){
                reportProduct(reportData.givenReportedID, reportText);
            }else{
                reportComment(reportData.givenReportedID, reportText);
            }
        }
    };

    const displayReportOverlay = () => {
        console.log("Event: CompareStorage has been updated");
        setIsProductCompareToolbarVisible(isAnyProductToCompareSelected())
    }

    useEffect(() => {
        addListenerLoadReportOverlay(displayReportOverlay);
        displayReportOverlay();
        return () => { //kiedy komponent przestaje dzialac usuwany jest listener
            removeListenerLoadReportOverlay(displayReportOverlay);
        }
    }, []); //Pozbycie się ", []" usuwa warning ale w konsoli pokazane jest jakby dwukrotnie wywołana była ta funkcja. tak czy inaczej działa


    return(
        <div>
            <a href="" id="ReportInputText">
                <input type="text" onChange={handleChange}/>
                <input type="button" onClick={sendReport} />
            </a>
        </div>
    );
};

export default ReportOverlay;

