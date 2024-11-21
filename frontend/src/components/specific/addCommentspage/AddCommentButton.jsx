import { NavigateFunctions } from "../../functions/NavigateFunctions";
import {LoginFunctions} from "../../functions/LoginFunctions";

function AddCommentButton() {
    const { openAddCommentpage } = NavigateFunctions();
    const {isNormalUser} = LoginFunctions();

    const handleClick = () => {
        openAddCommentpage();
    };

    if(isNormalUser()){
        return (
            <div className="d-flex justify-content-center mt-3">
                <button onClick={handleClick} className="btn btn-primary btn-lg">
                    Add Comment
                </button>
            </div>
        );
    }else{
        return null;
    }
}

export default AddCommentButton;