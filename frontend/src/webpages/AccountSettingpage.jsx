import {NavigateFunctions} from "../components/functions/NavigateFunctions";
import {LoginFunctions} from "../components/functions/LoginFunctions";
import {GenericAccountFunctions} from "../components/functions/GenericAccountFunctions";
import {useState} from "react";

const AccountSettingpage = () => {

    const {updateCredential, getCredentialTypes} = GenericAccountFunctions();

    const FIELDTYPES = getCredentialTypes();

    const [editingField, setEditingField] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [warningMessage, setWarningMessage] = useState("");

    const selectEditField = (fieldType) => {
        switch(fieldType){
            case FIELDTYPES.username: {
                setEditingField(fieldType);
                break;
            }

            case FIELDTYPES.password:{
                setEditingField(fieldType);
                break;
            }

            default:{
                setEditingField(null);
            }
        }
    }

    const handleClick = (e) => {
        switch(fieldType){
            case FIELDTYPES.username: {
                updateCredential(e,editingField,username);
                break;
            }

            case FIELDTYPES.password:{
                if(password !== confirmPassword){
                    displayErrorOutput("Passwords don't match");
                }
                updateCredential(e,editingField,password);
                break;
            }

            default:{
                displayErrorOutput("Tried to update null field");
                setEditingField(null);
            }
        }
    }

    const displayErrorOutput = (message) => {
        setWarningMessage(message);
    }

    const displayEditField = (editField) => {
        switch(editingField){
            case editField.username: {
                return <div>
                    <input
                        type="text"
                        value={username}
                        placeholder="Enter new username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setWarningMessage(null);
                        }}
                    />
                    <button onClick={(e) => handleClick(e)}>Save New Username</button>
                </div>
            }

            case editField.password:{
                return <div>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter new password"
                        onChange={(e) => {
                                setPassword(e.target.value);
                                setWarningMessage(null);
                            }
                        }
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="Enter new password"
                        onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                setWarningMessage(null);
                            }
                        }
                    />
                    <button onClick={(e) => handleClick(e)}>Save New Password</button>
                </div>
            }

            default:{
                setEditingField(null);
            }
        }
    }


    return (
        <div>
            <h2>change user name</h2>
            {displayEditField(FIELDTYPES.username)}

            <h2>change password</h2>
            {displayEditField(FIELDTYPES.password)}

            {warningMessage && <p>{warningMessage}</p>}
        </div>

    );

};

export default AccountSettingpage;