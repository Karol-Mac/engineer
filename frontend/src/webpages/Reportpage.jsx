import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ReportFunctions} from "../components/functions/ReportFunctions";

const Reportpage = () => {
    const {reportType,reportID} = useParams();
    const {reportComment,reportProduct, setReportTypeProduct, setReportTypeComment} = ReportFunctions();
    const [reportDescription, setReportDescription] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    useEffect(() => {

    }, [reportID, reportType]);

    const handleChange = ({ currentTarget: input }) => {
        setReportDescription(input.value);
    };

    const handleReport = async() => {
        let response;
        if(reportType === setReportTypeProduct()){
            console.log("reportID : "+reportID + " reportDesc"+ reportDescription);
            response = await reportProduct({productID: reportID, reportText: reportDescription});
        }else if(reportType === setReportTypeComment()){
            response = await reportComment({commendID: reportID, reportText: reportDescription});
        }else{
            setResponseMessage("WRONG REPORT TYPE PASSED");
            console.log("WRONG REPORT TYPE PASSED");
        }

        if(response != null && response.success){
            console.log("Reporting sucessful");
        }
    };

    return (
        <div>
            <h1>Temp Reportpage</h1>
            <p>{reportType}</p>
            <p>{reportID}</p>

            <label htmlFor="reportDescription">Description</label><br/>
            <textarea id="reportDescription" name="reportDescription" onChange={handleChange}></textarea>
            <button onClick={handleReport}/>
            <p>{responseMessage}</p>
        </div>

    );

};

export default Reportpage;