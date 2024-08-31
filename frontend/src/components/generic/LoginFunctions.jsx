export const LoginFunctions = () => {

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenType");
        window.location.reload();
    };

    return {
        handleLogout,
    };
};

