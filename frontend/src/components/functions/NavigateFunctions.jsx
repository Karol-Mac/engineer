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
        navigate("/compare");
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

    const openSearchpage = (searchedProductName) => { //pass json with searchedProductName : PRODUCTNAME
        const queryParams = new URLSearchParams(searchedProductName).toString();
        // console.log("queryParams = "+queryParams);
        navigate(`/search?${queryParams}`);
    }
    const openAccountSettingpage = () =>{
        navigate("/account");
    }

    const openContactpage = () =>{
        navigate("/contact");
    }

    const openProductRaportpage = ({reportedProductID}) =>{
        navigate("/productRaport/"+reportedProductID);
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
        openLoginpage,
        openSignuppage,
        openHomepage,
        openCommentspage,
        openAccountSettingpage,
        openContactpage,
        openSearchpage,
        openProductRaportpage,
        openProductpage,
    };
};

