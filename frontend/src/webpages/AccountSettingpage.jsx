import {NavigateFunctions} from "../components/functions/NavigateFunctions";
import {LoginFunctions} from "../components/functions/LoginFunctions";
import {GenericAccountFunctions} from "../components/functions/GenericAccountFunctions";
import {useEffect, useState} from "react";
import styles from '../css/Accountpage.module.css';
import HeaderSimple from "../components/generic/HeaderSimple";
import Footer from "../components/generic/Footer"; // Import the CSS module

const AccountSettingpage = () => {

    const {updateCredential, getCredentialTypes} = GenericAccountFunctions();

    const FIELDTYPES = getCredentialTypes();

    const [editingField, setEditingField] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [warningMessage, setWarningMessage] = useState("");

    useEffect(() => {

    }, [editingField]);

    const selectEditField = (fieldType) => {
        if(fieldType === editingField){
            setEditingField(null);
            return;
        }

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
        switch(editingField){
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
                    <button onClick={handleClick} className={styles.saveUsernameButton}>Save New Username</button>
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
                    <button onClick={handleClick} className={styles.savePasswordButton}>Save New Password</button>
                </div>
            );
        }

        return null;
    };


    return (
        <div className="d-flex flex-column min-vh-100">
            <HeaderSimple />
            <main className="flex-grow-1">
                <div className={styles.content}>
                    <h2
                        onClick={() => selectEditField(FIELDTYPES.username)}
                        className={styles.button}
                    >
                        Change Username
                    </h2>
                    {renderEditField(FIELDTYPES.username)}

                    <h2
                        onClick={() => selectEditField(FIELDTYPES.password)}
                        className={styles.button}
                    >
                        Change Password
                    </h2>
                    {renderEditField(FIELDTYPES.password)}

                    {warningMessage && <p>{warningMessage}</p>}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AccountSettingpage;