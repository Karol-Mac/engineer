import axios from "axios";
import {useState} from "react";

export const CommentFunctions = () => {
    const [error, setError] = useState("");

    const getComments = async () => {
        try {
            const getCommentsURL = "http://localhost:8080/api/comments";
            const AuthorizationToken = localStorage.getItem("accessToken");

            const response = await axios.get(getCommentsURL, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                }
            });
            return { success: true, commentsData: response.data };
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
            return { success: false, message: error.message };
        }
    };

    const getSpecificComment = async({commentID}) => {
        try {
            const getCommentsURL = "http://localhost:8080/api/comments/" + commentID;
            const AuthorizationToken = localStorage.getItem("accessToken");

            const {responseData: res} = await axios.get(getCommentsURL, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                }
            });

            return{ success: true, commentData: res.data};
        }catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }

    const addComment = async({commentText}) => {
        if (!commentText) {
            return { success: false, message: "Comment is empty" };
        }

        try {
            const commentURL = "http://localhost:8080/api/comments";
            const commentData = { commentText };
            const AuthorizationToken = localStorage.getItem("accessToken");

            const {} = await axios.post(commentURL, commentData, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                }
            });
            return { success: true};
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                return { success: true, data: error };
            }
        }
    };

    const deleteComment = async({commentID}) => {
        try {
            const deleteCommentURL = "http://localhost:8080/api/comments/"+commentID;
            const AuthorizationToken = localStorage.getItem("accessToken");

            const {} = await axios.delete(deleteCommentURL, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                }
            });
            return{ success: true};
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
        getSpecificComment,
        getComments,
        addComment,
        deleteComment
    };
};