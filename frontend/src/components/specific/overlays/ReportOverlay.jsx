import {CompareFunctions} from "../../functions/CompareFunctions";
import {useEffect, useState} from "react";
import {CustomEventsControler} from "../../functions/CustomEventsControler";
import {ReportFunctions} from "../../functions/ReportFunctions";

const ReportOverlay = () => {
    const {reportProduct, reportComment } = ReportFunctions();
    const {addListenerLoadReportOverlay,removeListenerLoadReportOverlay} = CustomEventsControler();

    const [reportText, setReportText] = useState("");
    const [reportData, setReportData] = useState(null);
    const [reportVisibility, setReportVisibility] = useState(false);

    const handleChange = ({ currentTarget: input }) => {
        setReportText({ ...reportText, [input.name]: input.value });
    };

    const handleEventData = (event) => {
        if(!event){
            console.log("ReportOverlay handleEventData event is passed")
        }
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
        setReportVisibility(true);
    }

    const hideReportOverlay = () => {
        setReportVisibility(false);
    }

    useEffect(() => {
        addListenerLoadReportOverlay(handleEventData);
        displayReportOverlay();
        return () => { //kiedy komponent przestaje dzialac usuwany jest listener
            removeListenerLoadReportOverlay(handleEventData);
            hideReportOverlay();
        }
    }, []); //Pozbycie się ", []" usuwa warning ale w konsoli pokazane jest jakby dwukrotnie wywołana była ta funkcja. tak czy inaczej działa


    return(
        reportVisibility ? (
            //className wykorzystywany do wyswietlania wyszazonego tła na stronie
            <div id="ReportBgDiv" className="VisibleOverlayBackground">
                {/*className wykorzystywany do wyswietlania nakładki w css-ie*/}
                <div id="ReportContentDiv" className="VisibleOverlayContent">
                    <a href="" id="ReportInputText">
                        <input type="text" onChange={handleChange}/>
                        <input type="button" onClick={cancelReport} />
                        <input type="button" onClick={sendReport} />
                    </a>
                </div>
            </div>
        ) : (
            <div id="ReportDiv" className="HiddlenOverlay">
            </div>
        )
    );
};

export default ReportOverlay;