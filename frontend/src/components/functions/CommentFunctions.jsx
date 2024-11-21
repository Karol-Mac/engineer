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

    const addComment = async (commentText) => {
        console.log("Comment text: " + commentText);

        if (!commentText) {
            return { success: false, message: "Comment is empty" };
        }

        try {
            const commentURL = "http://localhost:8080/api/comments";
            const AuthorizationToken = localStorage.getItem("accessToken");

            if (!AuthorizationToken) {
                console.error("Authorization Token missing");
                return { success: false, message: "Authorization Token is missing" };
            }

            console.log("Comment data to send: " + commentText);

            await axios.post(commentURL, commentText, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`,
                    "Content-Type": "text/plain",
                },
            });

            return { success: true };
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                console.error("Error response:", error.response.data.message);
                return { success: false, message: error.response.data.message };
            }

            console.error("Unexpected error:", error.message);
            return { success: false, message: "Unexpected error occurred" };
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