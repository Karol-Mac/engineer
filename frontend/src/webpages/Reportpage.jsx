import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ReportFunctions} from "../components/functions/ReportFunctions";
import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import {NavigateFunctions} from "../components/functions/NavigateFunctions";

const Reportpage = () => {
    const {openHomepage} = NavigateFunctions();
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
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <div className="container mt-5">
                    <h1 className="mb-4">Report {reportType}</h1>

                    <div className="mb-3">
                        <label htmlFor="reportDescription" className="form-label">Description</label><br />
                        <textarea
                            id="reportDescription"
                            name="reportDescription"
                            onChange={handleChange}
                            className="form-control"
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary mb-4" onClick={handleReport}>
                            Submit Report
                        </button>
                    </div>
                    {responseMessage && <p className="mt-3">{responseMessage}</p>}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Reportpage;