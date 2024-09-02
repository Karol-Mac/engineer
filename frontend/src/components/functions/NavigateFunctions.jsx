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

    const openSpecificpage = (name) => {
        navigate(name);
    }

    const openNewTabSpecificpage = (name) => {
        window.open(name);
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
        openProductRaportpage
    };
};

