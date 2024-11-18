import {NavigateFunctions} from "../components/functions/NavigateFunctions";
import {LoginFunctions} from "../components/functions/LoginFunctions";
import {GenericAccountFunctions} from "../components/functions/GenericAccountFunctions";
import {useEffect, useState} from "react";
import {AdminAccountFunctions} from "../components/functions/AdminAccountFunctions";
import styles from '../css/AdminReportPanelpage.module.css';
import HeaderSimple from "../components/generic/HeaderSimple";
import Footer from "../components/generic/Footer";

const AdminReportPanelpage = () => {
    const {getReports} = AdminAccountFunctions();

    const REPORTTYPES = {
        comment: "Comment",
        product: "Product"
    };

    const REPORTSCOPE = {
        all: "all",
        new: "new",
        old: "old"
    };

    const [allReports, setAllReports] = useState([]);
    const [commentReports, setCommentReports] = useState([]);
    const [productReports, setProductReports] = useState([]);
    const [currentReportScope, setCurrentReportScope] = useState(REPORTSCOPE.all);
    const [currentReportType, setCurrentReportType] = useState(REPORTTYPES.comment);
    const [warningMessage, setWarningMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchAllReports = async () => {
            setIsLoading(true); // Start loading
            await getReports().then(
                async (result) => {
                    if (result.success) {
                        const allReports = result.raports;

                        const commentReportsList = allReports.filter((report) => report.commentId !== null);
                        const productReportsList = allReports.filter((report) => report.productId !== null);

                        setAllReports(allReports);
                        setCommentReports(commentReportsList);
                        setProductReports(productReportsList);

                        console.log("Reports:", allReports);
                    } else {
                        setWarningMessage(result.message || "Error fetching reports.");
                    }
                    setIsLoading(false); // End loading
                }
            );
        };

        fetchAllReports();
    }, []);

    function getThead() {
        return <thead>
        <tr>
            <th>ID</th>
            <th>Created At</th>
            <th>Is Done</th>
            <th>Message</th>
            {currentReportType === REPORTTYPES.comment ? <th>Comment ID</th> : <th>Product ID</th>}
            <th>Reporter Name</th>
            {currentReportType === REPORTTYPES.comment ? <th>Author name</th> : <th>Producent name</th>}
            <th>Author ID</th>
        </tr>
        </thead>;
    }

    function getTbody(selectedRaports) {
        return <tbody>
        {selectedRaports.map((report) => {
            const parsedMessage = report.message || "No message available";
            return (
                <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{new Date(report.createdAt).toLocaleString()}</td>
                    <td>{report.isDone ? "Yes" : "No"}</td>
                    <td>{parsedMessage}</td>
                    {currentReportType === REPORTTYPES.comment ? <td>{report.commentId}</td> : <td>{report.productId}</td>}
                    <td>{report.reporterName}</td>
                    <td>{report.authorName}</td>
                    <td>{report.authorId}</td>
                </tr>
            );
        })}
        </tbody>;
    }

    const renderRaports = () => {
        if (isLoading) {
            return <p>Loading reports...</p>;
        }

        if (commentReports.length === 0 && currentReportType === REPORTTYPES.comment) {
            return <p>No comments reports found.</p>;
        }

        if (productReports.length === 0 && currentReportType === REPORTTYPES.product) {
            return <p>No product reports found.</p>;
        }

        let selectedRaports = [];
        if (currentReportType === REPORTTYPES.comment) {
            selectedRaports = commentReports;
        } else if (currentReportType === REPORTTYPES.product) {
            selectedRaports = productReports;
        } else {
            return <p>Invalid report type selected</p>;
        }

        if (currentReportScope === REPORTSCOPE.new) {
            selectedRaports = selectedRaports.filter((report) => !report.isDone);
        } else if (currentReportScope === REPORTSCOPE.old) {
            selectedRaports = selectedRaports.filter((report) => report.isDone);
        }

        return (
            <div>
                <h2>{currentReportType} Reports - {currentReportScope}</h2>
                <table className={styles.reportTable}>
                    {getThead()}
                    {getTbody(selectedRaports)}
                </table>
            </div>
        );
    };

    const handleTypeChange = (selectedType) => {
        console.log("Setting type to:", selectedType);
        setCurrentReportType(selectedType);
    };

    const handleScopeChange = (selectedScope) => {
        console.log("Setting scope to:", selectedScope);
        setCurrentReportScope(selectedScope);
    };

    const renderWarning = () => {
        return warningMessage ? <p style={{ color: "red" }}>{warningMessage}</p> : null;
    };

    return (
        <div>
            <HeaderSimple/>
                <div   className={styles.content}>
                    <h1>Admin Report Panel</h1>
                    <div className={styles.reportTypeSelectionWrapper}>
                        <div id="reportTypeSelection" className={styles.reportTypeSelection}>
                            <p onClick={() => handleTypeChange(REPORTTYPES.comment)} className={`${styles.selectionItem} ${currentReportType === REPORTTYPES.comment ? styles.selected : ''}`}>Select Comment Reports</p>
                            <p onClick={() => handleTypeChange(REPORTTYPES.product)} className={`${styles.selectionItem} ${currentReportType === REPORTTYPES.product ? styles.selected : ''}`}>Select Product Reports</p>
                        </div>
                    </div>

                    <div className={styles.reportScopeSelectionWrapper}>
                        <div id="reportScopeSelection" className={styles.reportScopeSelection}>
                            <p onClick={() => handleScopeChange(REPORTSCOPE.new)} className={`${styles.selectionItem} ${currentReportScope === REPORTSCOPE.new ? styles.selected : ''}`}>New</p>
                            <p onClick={() => handleScopeChange(REPORTSCOPE.old)} className={`${styles.selectionItem} ${currentReportScope === REPORTSCOPE.old ? styles.selected : ''}`}>Old</p>
                            <p onClick={() => handleScopeChange(REPORTSCOPE.all)} className={`${styles.selectionItem} ${currentReportScope === REPORTSCOPE.all ? styles.selected : ''}`}>All</p>
                        </div>
                    </div>

                    <div className={styles.reportTable}>
                        {renderRaports()}
                        {renderWarning()}
                    </div>
            </div>
            <Footer/>
        </div>
    );
};

export default AdminReportPanelpage;