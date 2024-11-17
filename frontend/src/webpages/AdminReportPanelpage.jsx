import {NavigateFunctions} from "../components/functions/NavigateFunctions";
import {LoginFunctions} from "../components/functions/LoginFunctions";
import {GenericAccountFunctions} from "../components/functions/GenericAccountFunctions";
import {useEffect, useState} from "react";
import {AdminAccountFunctions} from "../components/functions/AdminAccountFunctions";

const AdminReportPanelpage = () => {

    const REPORTTYPES = {
        comment: "Comment",
        product: "Product"
    };

    const REPORTSCOPE = {
        all: "all",
        new: "new",
        old: "old"
    }

    const {getReports} = AdminAccountFunctions();
    const [allReports, setAllReports] = useState([]);
    const [commentReports, setCommentReports] = useState([]);
    const [productReports, setProductReports] = useState([]);

    const [currentReportScope, setCurrentReportScope] = useState(REPORTSCOPE.all);
    const [currentReportType, setCurrentReportType] = useState(REPORTTYPES.comment);

    const [warningMessage, setWarningMessage] = useState("");

    useEffect(() => {
        const fetchAllProductDetails = async () => {
            await getReports().then(
                async (result) => {
                    if (result.success) {
                        const allReports = result.raports;

                        const commentReportsList = allReports.filter((report) => report.commentId !== null);
                        const productReportsList = allReports.filter((report) => report.productId !== null);

                        setAllReports(allReports);
                        setCommentReports(commentReportsList);
                        setProductReports(productReportsList);



                        console.log("Products:", result.productDetails);
                    } else {
                        setWarningMessage(result.message || "Error fetching reports.");                    }
                }
            )
        }

        fetchAllProductDetails();
    },[]);

    const renderRaports = () => {
        if(commentReports.length === 0){
            return <p>No comments reports found.</p>
        }

        let selectedRaports;
        if(currentReportType === REPORTTYPES.comment){
            selectedRaports = commentReports;
        }else if(currentReportType === REPORTTYPES.product){
            selectedRaports = productReports;
        }else{
            return <p>Wrongly selected report Type</p>
        }

        if(currentReportScope === REPORTSCOPE.new){
            selectedRaports.filter((raports) => raports.isDone === false);
        }else if(currentReportScope === REPORTSCOPE.old){
            selectedRaports.filter((raports) => raports.isDone === true)
        }

        return (
            <div>
                <h2>{currentReportType.toString()} {currentReportScope === true ? "New" : "All"}Reports</h2>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Created At</th>
                        <th>Is Done</th>
                        <th>Message</th>
                        <th>Comment ID</th>
                        <th>Reporter Name</th>
                        <th>Author ID</th>
                        <th>Author Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedRaports.map((report) => {
                        const parsedMessage = JSON.parse(report.message).reportText || report.message;
                        return (
                            <tr key={report.id}>
                                <td>{report.id}</td>
                                <td>{new Date(report.createdAt).toLocaleString()}</td>
                                <td>{report.isDone ? "Yes" : "No"}</td>
                                <td>{parsedMessage}</td>
                                <td>{report.commentId}</td>
                                <td>{report.reporterName}</td>
                                <td>{report.authorId}</td>
                                <td>{report.authorType}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        )
    }

    const handleTypeChange = (selectedType) => {
        setCurrentReportType(selectedType);
    }

    const handleScopeChange = (selectedScope) => {
        setCurrentReportScope(selectedScope);
    }

    return (
        <div>
            <h1>Admin Report Panel</h1>
            <div id="raportTypeSelection">
                <p onClick={handleTypeChange(REPORTTYPES.comment)}>Select Comments Raports</p>
                <p onClick={handleTypeChange(REPORTTYPES.product)}>Select Products Raports</p>

            </div>

            <div id="raportScopeSelection">
                <p onClick={handleTypeChange(REPORTSCOPE.new)}>new</p>
                <p onClick={handleTypeChange(REPORTSCOPE.old)}>old</p>
                <p onClick={handleTypeChange(REPORTSCOPE.all)}>all</p>
            </div>

            {renderRaports}
            {warningMessage && <p style={{ color: "red" }}>{warningMessage}</p>}
        </div>
    );
};

export default AdminReportPanelpage;