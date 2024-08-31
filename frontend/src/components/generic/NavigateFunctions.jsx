import {useNavigate} from "react-router-dom";

export const NavigateFunctions = () => {
    const navigate = useNavigate();

    const returnToPreviousPage = () =>{
        navigate(-1);
    }


    const openComparePage = () =>{
       window.open("/compare"); //if doesn't work check if the path is correct
    }

    const openSpecificPage = (name) => {
        window.open(name);
    }

    return {
        returnToPreviousPage,
        openComparePage,
        openSpecificPage,
    };
};

