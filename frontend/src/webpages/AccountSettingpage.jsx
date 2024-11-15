import {NavigateFunctions} from "../components/functions/NavigateFunctions";
import {LoginFunctions} from "../components/functions/LoginFunctions";

const AccountSettingpage = () => {

    const FIELDTYPES = {
        username: "username",
        password: "password"
    };

    const [editingField, setEditingField] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const displayEditField = (editField) => {
        switch(editingField){
            case editField.username: {
                return <div>
                    <input
                        type="text"
                        value={username}
                        placeholder="Enter new username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={() => handleSave(FIELDTYPES.username)}>Save New Username</button>
                </div>
            }

            case editField.password:{
                return <div>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter new password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="Enter new password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={() => handleSave(FIELDTYPES.password)}>Save New Password</button>
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
        </div>

    );

};

export default AccountSettingpage;