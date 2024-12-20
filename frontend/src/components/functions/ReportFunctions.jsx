import axios from "axios";
import { useState } from "react";
import { NavigateFunctions } from "./NavigateFunctions";

export const ReportFunctions = () => {
    const { openHomepage } = NavigateFunctions();

    const [error, setError] = useState("");

    const AuthorizationToken = localStorage.getItem("accessToken");

    const setReportTypeProduct = () => "Product";
    const setReportTypeComment = () => "Comment";

    const checkReportTypeProduct = ({ reportType }) => reportType === setReportTypeProduct();

    const reportProduct = async ({ productID, reportText }) => {
        try {
            const raportURL = `http://localhost:8080/api/reports?productId=${productID}`;
            const reportData = { reportText };

            const { data: res } = await axios.post(raportURL, reportData, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`,
                },
            });
            const postRes = res.data;

            if(postRes == null){
                console.log("Reported product, opening Homepage");
                openHomepage();
                return { success: true, message: "Reporting successful"};
            }
            return { success: false, message: "reporting product post failure" };
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
                return { success: false, message: error.response.data.message };
            }
            return { success: false, message: "An unexpected error occurred" };
        }
    };

    const reportComment = async ({ commendID, reportText }) => {
        try {
            const reportURL = `http://localhost:8080/api/reports?commentId=${commendID}`;
            const reportData = { reportText };

            const { data: res } = await axios.post(reportURL, reportData, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`,
                },
            });
            const postRes = res.data;

            if(postRes == null){
                console.log("Reported comment, opening Homepage");
                openHomepage();
                return { success: true , message: "Reporting successful" };
            }
            return { success: false, message: "reporting comment post failure" };
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
                return { success: false, message: error.response.data.message };
            }
            return { success: false, message: "An unexpected error occurred" };
        }
    };

    const resolveReport = async(objectID) => {
        try {
            const hideObjectURL = `http://localhost:8080/api/reports?reportId=${objectID}`;
            const is_done =  true;



            const { data: res } = await axios.put(hideObjectURL, is_done, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`,
                'Content-Type': 'application/json',
                },
            });

            const postRes = res.data;

            if(postRes == null){
                return { success: true , message: "Removed object" };
            }

            return { success: false, message: "Hiding object post failure" };
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
                return { success: false, message: error.response.data.message };
            }
            return { success: false, message: "An unexpected error occurred" };
        }
    }

    const banCommentAuthor = async({authorID}) => {
        try{
            const banCommentAuthorURL = `http://localhost:8080/api/reports/${authorID}`;
            const {data: res} = await axios.delete(banCommentAuthorURL, null, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`,
                },
            });

            const postRes = res.data;

            if(postRes == null){
                return { success: true , message: "Removed object" };
            }

            return { success: false, message: "Hiding object post failure" };
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
                return { success: false, message: error.response.data.message };
            }
            return { success: false, message: "An unexpected error occurred" };
        }
    }

    return {
        reportProduct,
        reportComment,
        setReportTypeProduct,
        setReportTypeComment,
        checkReportTypeProduct,
        resolveReport,
        banCommentAuthor,

    };
};