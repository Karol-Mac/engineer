import { NavigateFunctions } from "../components/functions/NavigateFunctions";
import { LoginFunctions } from "../components/functions/LoginFunctions";
import { GenericAccountFunctions } from "../components/functions/GenericAccountFunctions";
import { useEffect, useState } from "react";
import { AdminAccountFunctions } from "../components/functions/AdminAccountFunctions";
import styles from '../css/AdminReportPanelpage.module.css';
import HeaderSimple from "../components/generic/HeaderSimple";
import Footer from "../components/generic/Footer";
import { useParams } from "react-router-dom";

const AdminReportVerdictpage = () => {
    const { reportID } = useParams();
    const { getReportById } = AdminAccountFunctions();

    const [report, setReport] = useState(null);
    const [warningMessage, setWarningMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            setIsLoading(true);
            const result = await getReportById(reportID);
            if (result.success) {
                setReport(result.report);
            } else {
                setWarningMessage(result.message || "Error fetching report.");
            }
            setIsLoading(false);
        };

        fetchReport();
    }, [reportID, getReportById]);

    const renderReportDetails = () => {
        if (isLoading) {
            return <p>Loading report...</p>;
        }

        if (!report) {
            return <p>No report found.</p>;
        }

        let parsedMessage = "'No message available'";
        try {
            const parsed = JSON.parse(report.message);
            parsedMessage = parsed.reportText || "'No message available'";
        } catch (error) {
            console.error("Failed to parse message:", error);
        }

        return (
            <div>
                <h2>Report Details</h2>
                <table className={styles.reportTable}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Created At</th>
                        <th>Is Done</th>
                        <th>Message</th>
                        <th>{report.commentId ? "Comment ID" : "Product ID"}</th>
                        <th>Reporter Name</th>
                        <th>{report.commentId ? "Author name" : "Producent name"}</th>
                        <th>Author ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{report.id}</td>
                        <td>{new Date(report.createdAt).toLocaleString()}</td>
                        <td>{report.isDone ? "Yes" : "No"}</td>
                        <td>{parsedMessage}</td>
                        <td>{report.commentId || report.productId}</td>
                        <td>{report.reporterName}</td>
                        <td>{report.authorName}</td>
                        <td>{report.authorId}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            <HeaderSimple />
            <div className={styles.content}>
                <h1>Admin Report Verdict</h1>
                {renderReportDetails()}
                {warningMessage && <p style={{ color: "red" }}>{warningMessage}</p>}
            </div>
            <Footer />
        </div>
    );
};

export default AdminReportVerdictpage;