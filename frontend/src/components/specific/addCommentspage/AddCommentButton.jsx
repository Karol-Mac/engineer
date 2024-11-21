import { NavigateFunctions } from "../../functions/NavigateFunctions";

function AddCommentButton() {
    const { openAddCommentpage } = NavigateFunctions();

    const handleClick = () => {
        openAddCommentpage();
    };



    return (
        <div className="d-flex justify-content-center mt-3">
            <button onClick={handleClick} className="btn btn-primary btn-lg">
                Add Comment
            </button>
        </div>
    );
}

export default AddCommentButton;