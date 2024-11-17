import {NavigateFunctions} from "../components/functions/NavigateFunctions";
import {LoginFunctions} from "../components/functions/LoginFunctions";
import {GenericAccountFunctions} from "../components/functions/GenericAccountFunctions";
import {useEffect, useState} from "react";
import {AdminAccountFunctions} from "../components/functions/AdminAccountFunctions";

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
            <th>Author ID</th>
            <th>Author Type</th>
        </tr>
        </thead>;
    }

    function getTbody(selectedRaports) {
        return <tbody>
        {selectedRaports.map((report) => {
            const parsedMessage = JSON.parse(report.message).reportText || report.message;
            return (
                <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{new Date(report.createdAt).toLocaleString()}</td>
                    <td>{report.isDone ? "Yes" : "No"}</td>
                    <td>{parsedMessage}</td>
                    {currentReportType === REPORTTYPES.comment ? <td>{report.commentId}</td> : <td>{report.productID}</td>}
                    <td>{report.authorName}</td>
                    <td>{report.authorId}</td>
                    <td>{report.authorType}</td>
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
                <table>
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
            <h1>Admin Report Panel</h1>
            <div id="reportTypeSelection">
                <p onClick={() => handleTypeChange(REPORTTYPES.comment)}>Select Comment Reports</p>
                <p onClick={() => handleTypeChange(REPORTTYPES.product)}>Select Product Reports</p>
            </div>

            <div id="reportScopeSelection">
                <p onClick={() => handleScopeChange(REPORTSCOPE.new)}>New</p>
                <p onClick={() => handleScopeChange(REPORTSCOPE.old)}>Old</p>
                <p onClick={() => handleScopeChange(REPORTSCOPE.all)}>All</p>
            </div>

            {renderRaports()}
            {renderWarning()}
        </div>
    );
};

export default AdminReportPanelpage;
