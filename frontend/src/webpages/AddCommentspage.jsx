import { useEffect, useState } from "react";
import Header from "../components/generic/Header";
import Footer from "../components/generic/Footer";
import { CommentFunctions } from "../components/functions/CommentFunctions";
import LoadingOverlay from "../components/specific/overlays/LoadingOverlay";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../css/Commentspage.module.css";
import ReportButton from "../components/generic/ReportButton";
import {ReportFunctions} from "../components/functions/ReportFunctions";
import {NavigateFunctions} from "../components/functions/NavigateFunctions";

const AddCommentspage = () => {
    const { addComment } = CommentFunctions();
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState("");

    const handleAddComment = async (e) => {
        e.preventDefault();
        const res = await addComment(newComment);
        if (res.success) {
            setNewComment("");
        } else {
            setError(res.message);
        }
    };

    const handleChange = (e) => {
        setNewComment(e.target.value)
    }

    return (
            <div>
                <Header />
                <div className="container mt-5 position-relative">

                <form onSubmit={handleAddComment} className="mb-4">
                    <div className="mb-3">
                        <label htmlFor="newComment" className="form-label">Add a Comment</label>
                        <textarea
                            id="newComment"
                            className="form-control"
                            value={newComment}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {error && (
                    <div className="alert alert-warning" role="alert">
                        {error}
                    </div>
                )}
                </div>
            <Footer />
        </div>
    );
};
export default AddCommentspage;

