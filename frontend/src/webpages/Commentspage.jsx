import { useEffect, useState } from "react";
import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import { CommentFunctions } from "../components/functions/CommentFunctions";
import LoadingOverlay from "../components/specific/overlays/LoadingOverlay";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../css/Commentspage.module.css";
import ReportButton from "../components/generic/ReportButton";
import {ReportFunctions} from "../components/functions/ReportFunctions";

const Commentspage = () => {
    const { getComments } = CommentFunctions();
    const {setReportTypeComment, } = ReportFunctions();
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            const res = await getComments();
            if (res.success) {
                setComments(res.commentsData || []);
                console.log(res.commentsData);
            } else {
                setError(res.message);
            }
            setIsLoading(false);
        };

        fetchComments();
    }, []);

    if (isLoading) {
        return (
            <div>
                <Header />
                <LoadingOverlay />
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="container mt-5">
                {error && (
                    <div className="alert alert-warning" role="alert">
                        {error}
                    </div>
                )}
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="card mb-3">
                            <div className={styles.reportButtonContainer}>
                                <ReportButton reportType={setReportTypeComment()} givenReportedID={comment.id} />
                            </div>
                            <div className={`card-body`}>
                                <p className={`card-text  ${styles.fancyBorder}`}>"{comment.content}"</p>
                                <div className="text-end mt-3">
                                    <small className="text-muted">Made by {comment.authorName}</small>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="text-center text-danger mt-5">No comments available</h1>
                )}
            </div>
            <Footer />
        </div>
    );
};
export default Commentspage;

