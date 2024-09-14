import {useNavigate} from "react-router-dom";

export const NavigateFunctions = () => {
    const navigate = useNavigate();

    const returnToPreviousPage = () =>{
        navigate(-1);
    }

    const refreshPage = () => {
        window.location.reload();
    }


    const openComparepage = () =>{
       // window.open("/compare"); //if doesn't work check if the path is correct
        navigate("/compare");
    }

    const openFavouritepage = () =>{
        // window.open("/favourite"); //if doesn't work check if the path is correct
        navigate("/favourite");
    }
    const openLoginpage = () =>{
        // window.open("/login"); //if doesn't work check if the path is correct
        navigate("/login");
    }

    const openSignuppage = () =>{
        // window.open("/signup"); //if doesn't work check if the path is correct
        navigate("/signup");
    }

    const openHomepage = () =>{
        // window.open("/"); //if doesn't work check if the path is correct but this path is rather correct :)
        navigate("/");
    }
    const openCommentspage = () =>{
        // window.open("/comments"); //if doesn't work check if the path is correct
        navigate("/comments");
    }

    const openSearchpage = (searchedProductName) => { //pass json with searchedProductName : PRODUCTNAME
        // window.open("/comments"); //if doesn't work check if the path is correct
        const queryParams = new URLSearchParams(searchedProductName).toString();
        console.log("queryParams = "+queryParams);
        navigate(`/search?${queryParams}`);
    }
    const openAccountSettingpage = () =>{
        // window.open("/account"); //if doesn't work check if the path is correct
        navigate("/account");
    }

    const openContactpage = () =>{
        // window.open("/account"); //if doesn't work check if the path is correct
        navigate("/contact");
    }

    const openProductRaportpage = ({reportedProductID}) =>{
        // window.open("/account"); //if doesn't work check if the path is correct
        navigate("/productRaport/"+reportedProductID);
    }

    const openSpecificpage = ({name}) => {
        navigate(name);
    }

    const openSpecificpageWithParams = ({name, param}) => {
        navigate(name);
    }
    const openNewTabSpecificpage = (name) => {
        window.open(name);
    }

    const openFacebook = () => {
        window.open("https://www.facebook.com", "_blank");
    }

    return {
        returnToPreviousPage,
        refreshPage,
        openSpecificpage,
        openComparepage,
        openFavouritepage,
        openLoginpage,
        openSignuppage,
        openHomepage,
        openCommentspage,
        openAccountSettingpage,
        openContactpage,
        openSearchpage,
        openProductRaportpage,
    };
};

