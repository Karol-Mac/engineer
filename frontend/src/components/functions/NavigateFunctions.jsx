import {useNavigate} from "react-router-dom";
import TermsOfServicepage from "../../webpages/TermsOfServicepage";

export const NavigateFunctions = () => {
    const navigate = useNavigate();

    const returnToPreviousPage = () =>{
        navigate(-1);
    }

    const refreshPage = () => {
        window.location.reload();
    }


    const openComparepage = () =>{
        navigate("/compare");
    }

    const openAddProductpage = () =>{
        navigate("/add");
    }

    const openEditProductpage = (productID) =>{
        navigate("/edit/"+productID);
    }

    const openFavouritepage = () =>{
        navigate("/favourite");
    }
    const openLoginpage = () =>{
        navigate("/login");
    }

    const openSignuppage = () =>{
        navigate("/signup");
    }

    const openHomepage = () =>{
        navigate("/");
    }

    const openCommentspage = () =>{
        navigate("/comments");
    }

    const openAddCommentpage = () =>{
        navigate("/comments/add");
    }

    const openSearchpage = (searchedProductName) => { //pass json with searchedProductName : PRODUCTNAME
        const queryParams = new URLSearchParams(searchedProductName).toString();
        // console.log("queryParams = "+queryParams);
        navigate(`/search?${queryParams}`);
    }
    const openAccountpage = () =>{
        navigate("/account");
    }
    const openSellerProductspage = () =>{
        navigate("/account/products");
    }

    const openAccountSettingpage = () =>{
        navigate("/account/setting");
    }

    const openAdminpanelpage = () =>{
        navigate("/account/adminpanel");
    }

    const openAdminReportVerdictpage = (reportID) =>{
        navigate("/account/adminpanel/verdict/"+reportID);
    }

    const openContactpage = () =>{
        navigate("/contact");
    }

    const openTermsOfServicepage = () =>{
        navigate("/terms");
    }

    const openRaportpage = (reportType, reportID) =>{
        navigate("/report/"+reportType+"/"+reportID);
    }

    const openProductpage = ({productID}) => {
        navigate("/product/"+productID, {state: productID});
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
        openAddProductpage,
        openEditProductpage,
        openLoginpage,
        openSignuppage,
        openHomepage,
        openCommentspage,
        openAccountpage,
        openAccountSettingpage,
        openContactpage,
        openSearchpage,
        openRaportpage,
        openAdminReportVerdictpage,
        openProductpage,
        openSellerProductspage,
        openAdminpanelpage,
        openAddCommentpage,
        openTermsOfServicepage
    };
};

