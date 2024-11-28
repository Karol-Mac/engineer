import axios from "axios";

export const AdminAccountFunctions = () => {
    const getReports = async () => {
        let errorMessage;
        try {
            const getReportsURL = "http://localhost:8080/api/reports";
            const AuthorizationToken = localStorage.getItem("accessToken");
            console.log("Authorization Token:", AuthorizationToken);

            const response = await axios.get(getReportsURL, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`,
                    "Content-Type": "application/json",
                },
            });

            const data = response.data.map((report) => {
                let parsedMessage = {};

                if (report.message) {
                    try {
                        parsedMessage = JSON.parse(report.message);
                    } catch (parseError) {
                        console.error("Error parsing message JSON:", parseError);
                        parsedMessage = { reportText: "Error report message" };
                    }
                } else {
                    parsedMessage = { reportText: "No message available" };
                }

                return {
                    ...report,
                    reportText: parsedMessage?.reportText || "No message available",
                };
            });

            if (data.length === 0) {
                errorMessage = "No reports were found";
                return { success: false, message: errorMessage };
            }

            return { success: true, raports: data };
        } catch (error) {
            // Handle different types of errors
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                errorMessage = error.response.data.message || "Unknown error";
            } else if (error.response) {
                errorMessage = error.response;
            } else {
                errorMessage = "Network error or server is unreachable";
            }

            console.error("Error fetching reports:", errorMessage);
            return { success: false, message: errorMessage };
        }
    };

    const getReportById = async (reportId) => {
        let errorMessage;
        try {
            const getReportsURL = `http://localhost:8080/api/reports/${reportId}`;
            const AuthorizationToken = localStorage.getItem("accessToken");

            const response = await axios.get(getReportsURL, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`,
                    "Content-Type": "application/json",
                },
            });

            const data = response.data;

            if (!data) {
                errorMessage = "No report found";
                return { success: false, message: errorMessage };
            }

            return { success: true, report: data };
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                errorMessage = error.response.data.message || "Unknown error";
            } else if (error.response) {
                errorMessage = error.response;
            } else {
                errorMessage = "Network error or server is unreachable";
            }

            console.error("Error fetching report:", errorMessage);
            return { success: false, message: errorMessage };
        }
    };

    const banUser = async (userName) => {
        let errorMessage;
        try {
            const getUserByNameURL = `http://localhost:8080/api/accounts?name=${userName}`;
            const AuthorizationToken = localStorage.getItem("accessToken");

            // Step 1: Fetch the user data by username
            const response = await axios.get(getUserByNameURL, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`,
                    "Content-Type": "application/json",
                },
            });

            const userDataArray = response.data;

            if (!userDataArray || userDataArray.length === 0) {
                errorMessage = "User not found";
                return { success: false, message: errorMessage };
            }

            // Ensure we get the first user from the array
            const userData = userDataArray[0];

            // Step 2: Modify the user data to set isBlocked = true
            userData.isBlocked = true;

            const banUserURL = `http://localhost:8080/api/accounts`;

            // Step 3: Send the updated user data in a PUT request
            const responseBan = await axios.put(banUserURL, userData, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`,
                    "Content-Type": "application/json",
                },
            });

            const banData = responseBan.data;

            if (!banData) {
                errorMessage = "Banning failed";
                return { success: false, message: errorMessage };
            }

            return { success: true, message: banData };

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                errorMessage = error.response.data.message || "Invalid request data";
            } else if (error.response) {
                errorMessage = error.response.statusText || "Unknown server error";
            } else {
                errorMessage = "Network error or server is unreachable";
            }

            console.error("Error banning user:", errorMessage);
            return { success: false, message: errorMessage };
        }
    };


    const removeUserComments = async(userID) => {
        let errorMessage;
        try {
            const banUserURL = `http://localhost:8080/api/accounts/${userID}/comments`;
            const AuthorizationToken = localStorage.getItem("accessToken");

            const response = await axios.delete(banUserURL, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                },
            });

            const data = response.data;

            if (!data) {
                errorMessage = "user not found, banning failed";
                return { success: false, message: errorMessage };
            }

            return { success: true, message: data };
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                errorMessage = error.response.data.message || "Unknown error";
            } else if (error.response) {
                errorMessage = error.response;
            } else {
                errorMessage = "Network error or server is unreachable";
            }

            console.error("Error fetching report:", errorMessage);
            return { success: false, message: errorMessage };
        }
    }

    return {
        getReports,
        getReportById,
        banUser,
        removeUserComments
    };
};
