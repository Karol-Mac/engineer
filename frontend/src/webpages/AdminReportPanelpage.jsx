import {useEffect, useState} from "react";
import {AdminAccountFunctions} from "../components/functions/AdminAccountFunctions";
import styles from '../css/AdminReportPanelpage.module.css';
import HeaderSimple from "../components/generic/HeaderSimple";
import Footer from "../components/generic/Footer";
import {CommentFunctions} from "../components/functions/CommentFunctions";
import {SearchProductFunctions} from "../components/functions/SearchProductFunctions";
import {ReportFunctions} from "../components/functions/ReportFunctions";
import React from 'react';

const AdminReportPanelpage = () => {
    const {getReports,banUser,removeUserComments} = AdminAccountFunctions();
    const {resolveReport} = ReportFunctions();
    const {deleteComment} = CommentFunctions();
    const {deleteProduct} = SearchProductFunctions();

    const REPORTTYPES = {
        comment: "Comment",
        product: "Product"
    };

    const REPORTSCOPE = {
        all: "all",
        new: "new",
        archived: "archived"
    };

    const VERDICTOPTION = {
        delete: "deleteReportedObject",
        lockCommentAuthor: "lockCommentAuthor",
        lockReportAuthor: "lockReportAuthor",
        pass: "removeReport"
    };

    const [allReports, setAllReports] = useState([]);
    const [commentReports, setCommentReports] = useState([]);
    const [productReports, setProductReports] = useState([]);
    const [currentReportScope, setCurrentReportScope] = useState(REPORTSCOPE.all);
    const [currentReportType, setCurrentReportType] = useState(REPORTTYPES.comment);
    const [warningMessage, setWarningMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null);
    const [updatedReports, setUpdatedReports] = useState(true);

    useEffect(() => {
        if(updatedReports === true) {
            const fetchAllReports = async () => {
                setIsLoading(true);
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
                        setSelectedReport(null);
                        setIsLoading(false);
                    }
                );
            };

            fetchAllReports();
            setUpdatedReports(false);
        }
    }, [updatedReports]);

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

    const handleClick = (report) => {
        console.log("Clicked report: ", report);
        setSelectedReport(report);
    }

    const handleAction = async(actionType, reportID) => {
        switch(actionType) {
            case VERDICTOPTION.delete:{
                console.log("deleting comments = " + (currentReportType === REPORTTYPES.comment) + " current rep type: " + currentReportType);                const deleteRes = currentReportType === REPORTTYPES.comment ?
                    await deleteComment(selectedReport.commentId) :
                    await deleteProduct(selectedReport.productId);

                if(deleteRes.success){
                    //add notification

                    const passRes = await resolveReport(reportID);
                    if(passRes.success) {
                        setUpdatedReports(true);
                        console.log("DELETION RESOLVED");
                    }
                }else{
                    // notification with an error message from
                    // passRes.message
                }
                break;
            }
            case VERDICTOPTION.pass:{
                const passRes = await resolveReport(reportID);
                if(passRes.success){
                    //add notification
                    setUpdatedReports(true);
                    console.log("pass RESOLVED");
                }else{
                    // notification with an error message from
                    // passRes.message
                }

                break;
            }
            case VERDICTOPTION.lockReportAuthor:{
                const banRes = await banUser(selectedReport.authorName);
                if(banRes.success){
                    //add notification
                    const passRes = await resolveReport(reportID);
                    console.log("lockReportAuthor RESOLVED");
                    setUpdatedReports(true);
                }else{
                    // notification with an error message from
                    // passRes.message
                }
                break;
            }
            case VERDICTOPTION.lockCommentAuthor:{
                const banRes = await banUser(selectedReport.authorName);
                if(banRes.success){
                    //add notification
                    const removeUserCommentsRes = await removeUserComments(selectedReport.authorId);
                    const passRes = await resolveReport(reportID);
                    console.log("lockCommentAuthor RESOLVED");
                    setUpdatedReports(true);
                }else{
                    // notification with an error message from
                    // passRes.message
                }
                break;
            }
        }

    }

    function getTbody(selectedRaports) {
        return (
            <tbody>
            {selectedRaports.map((report) => {
                let parsedMessage = "No message available";
                try {
                    const parsed = JSON.parse(report.message);
                    parsedMessage = parsed.reportText || "No message available";
                } catch (error) {
                    console.error("Failed to parse message:", error);
                }

                return (
                    <React.Fragment key={report.id}>
                        <tr key={`main-${report.id}`} onClick={() => handleClick(report)}>
                            <td>{report.id}</td>
                            <td>{new Date(report.createdAt).toLocaleString()}</td>
                            <td>{report.isDone ? "Yes" : "No"}</td>
                            <td>{parsedMessage}</td>
                            {currentReportType === REPORTTYPES.comment ? (
                                <td>{report.commentId}</td>
                            ) : (
                                <td>{report.productId}</td>
                            )}
                            <td>{report.reporterName}</td>
                            <td>{report.authorName}</td>
                            <td>{report.authorId}</td>
                        </tr>
                        {selectedReport != null && selectedReport.id === report.id && (
                            <tr key={`details-${report.id}`}>
                                <td colSpan="8">
                                    <div className={styles.decisionPanel}>
                                        <button
                                            className={`${styles.delete}`}
                                            onClick={() => handleAction(VERDICTOPTION.delete, report.id)}
                                        >
                                            Delete {currentReportType}
                                        </button>
                                        {currentReportType === REPORTTYPES.comment && (
                                            <button
                                                className={`${styles.lock}`}
                                                onClick={() => handleAction(VERDICTOPTION.lockCommentAuthor, report.id)}
                                            >
                                                Lock Comment Author
                                            </button>
                                        )}
                                        <button
                                            className={`${styles.lock}`}
                                            onClick={() => handleAction(VERDICTOPTION.lockReportAuthor, report.id)}
                                        >
                                            Lock Report Author
                                        </button>
                                        <button
                                            className={`${styles.pass}`}
                                            onClick={() => handleAction(VERDICTOPTION.pass, report.id)}
                                        >
                                            Pass Report
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                );
            })}
            </tbody>
        );
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
        } else if (currentReportScope === REPORTSCOPE.archived) {
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
            <div className={styles.content}>
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
                        <p onClick={() => handleScopeChange(REPORTSCOPE.archived)} className={`${styles.selectionItem} ${currentReportScope === REPORTSCOPE.archived ? styles.selected : ''}`}>Archived</p>
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