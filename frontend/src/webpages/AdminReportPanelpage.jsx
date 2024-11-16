import {NavigateFunctions} from "../components/functions/NavigateFunctions";
import {LoginFunctions} from "../components/functions/LoginFunctions";
import {GenericAccountFunctions} from "../components/functions/GenericAccountFunctions";
import {useEffect, useState} from "react";
import {AdminAccountFunctions} from "../components/functions/AdminAccountFunctions";

const AdminReportPanelpage = () => {

    const {getReports} = AdminAccountFunctions();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchAllProductDetails = async () => {
            await getReports().then(
                async (result) => {
                    if (result.success) {




                        setProductDetails(result.productDetails);

                        const roundedValue = Number(result.productDetails.price * (result.productDetails.weight/1000.0)).toFixed(2);
                        setValuePer100Units(roundedValue);


                        const [sellerResult, productImageResult] = await Promise.all([
                            getSellerInformation({sellerID: result.productDetails.sellerId}),
                            getImageByName({imageName: result.productDetails.imageName}),
                        ]);

                        if (productImageResult.success){
                            setProductImage(productImageResult.image);
                        }

                        if (sellerResult.success) {
                            setSellerDetails(sellerResult.sellerDetails);
                            const sellerImageResults = await getImageByName({imageName: sellerResult.sellerDetails.imageName});
                            if (sellerImageResults.success) {
                                setSellerImage(sellerImageResults.image);
                            }
                        }

                        console.log("Products:", result.productDetails);
                    } else {
                        console.log("Error fetching products:", result.message);
                    }
                }
            )
        }

        fetchAllProductDetails();
    },[id]);


    const FIELDTYPES = getCredentialTypes();

    const [editingField, setEditingField] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [warningMessage, setWarningMessage] = useState("");

    useEffect(() => {

    }, [editingField]);


    const renderEditField = (fieldType) => {
        if (fieldType === FIELDTYPES.username && editingField === FIELDTYPES.username) {
            return (
                <div>
                    <input
                        type="text"
                        value={username}
                        placeholder="Enter new username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setWarningMessage(null);
                        }}
                    />
                    <button onClick={handleClick}>Save New Username</button>
                </div>
            );
        }

        if (fieldType === FIELDTYPES.password && editingField === FIELDTYPES.password) {
            return (
                <div>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter new password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setWarningMessage(null);
                        }}
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm new password"
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setWarningMessage(null);
                        }}
                    />
                    <button onClick={handleClick}>Save New Password</button>
                </div>
            );
        }

        return null;
    };


    return (
        <div>
            <h2 onClick={() => selectEditField(FIELDTYPES.username)}>change user name</h2>
            {renderEditField(FIELDTYPES.username)}

            <h2 onClick={() => selectEditField(FIELDTYPES.password)}>change password</h2>
            {renderEditField(FIELDTYPES.password)}

            {warningMessage && <p>{warningMessage}</p>}
        </div>
    );
};

export default AdminReportPanelpage;