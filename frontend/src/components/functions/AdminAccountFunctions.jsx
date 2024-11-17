import axios from "axios";

export const AdminAccountFunctions = () => {
    const getReports = async () => {
        let errorMessage;
        try {
            const getReportsURL = "http://localhost:8080/api/reports";
            const AuthorizationToken = localStorage.getItem("accessToken");
            console.log("Authorization Token:", AuthorizationToken);

            // Fetch reports with Authorization header
            const response = await axios.get(getReportsURL, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`,
                    "Content-Type": "application/json",
                },
            });

            // Process the response data
            const data = response.data.map((report) => {
                let parsedMessage = {};

                // Attempt to parse the message if it exists
                if (report.message) {
                    try {
                        parsedMessage = JSON.parse(report.message);
                    } catch (parseError) {
                        console.error("Error parsing message JSON:", parseError);
                        parsedMessage = { reportText: "Error report message" };
                    }
                } else {
                    parsedMessage = { reportText: "No message available" }; // Fallback for null message
                }

                // Return the report object with parsed message or fallback value
                return {
                    ...report,
                    reportText: parsedMessage?.reportText || "No message available",
                };
            });

            // Check if any reports were found
            if (data.length === 0) {
                errorMessage = "No reports were found";
                return { success: false, message: errorMessage };
            }

            // Return the parsed reports
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

    return {
        getReports,
    };
};
