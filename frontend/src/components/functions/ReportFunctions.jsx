import {CustomEventsControler} from "./CustomEventsControler";
import axios from "axios";
import {useState} from "react";

export const ReportFunctions = () => {
    const [error, setError] = useState(""); // na chwile obecna nie ma zastosowania

    const AuthorizationToken = localStorage.getItem("accessToken");
    const setReportTypeProduct = () =>{
        return "Product";
    }
    const setReportTypeComment = () =>{
        return "Comment";
    }

    const checkReportTypeProduct = ({reportType}) => {
        return reportType === setReportTypeProduct() ? true : false; //jezeli report jest typu produkt zwroc prawde w przeciwnym wypadku zwroc falsz
    }

    const reportProduct = async({productID, reportText}) => {


        try {
            var raportURL = "http://localhost:8080/api/reports?productId="+productID;
            const reportData = {reportText}

            const {responseData: res} = await axios.post(raportURL, reportData, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                }
            });
        }catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    const reportComment = async({commendID, raportText}) => {

        try {
            var raportURL = "http://localhost:8080/api/reports?commentId="+commendID;
            const raportData = {raportText}

            const {responseData: res} = await axios.post(raportURL, raportData, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                }
            });
        }catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return {
        reportProduct,
        reportComment,
        setReportTypeProduct,
        setReportTypeComment,
        checkReportTypeProduct,
    };
};