import axios from "axios";

export const AdminAccountFunctions = () => {
    const getReports = async()=>{
        let errorMessage;
        try {
            const getReportsURL = "http://localhost:8080/api/reports";
            const AuthorizationToken = localStorage.getItem("accessToken");

            const response = await axios.get(getReportsURL,{
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`,
                    "Content-Type": "application/json",
                },
            });

            const data = response.data.map((report) => {

                const parsedMessage = JSON.parse(report.message);
                return {
                    ...report,
                    reportText: parsedMessage.reportText,
                };
            });
            if (data.length <= 0) {
                errorMessage = "No reports were found";
                return { success: false, message: errorMessage };
            }


            return{ success: true, raports: data};
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
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
        getReports
    };
};

