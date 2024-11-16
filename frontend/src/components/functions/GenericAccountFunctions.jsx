import axios from "axios";

export const GenericAccountFunctions = () => {

    const CREDENTIALTYPES = {
        username: "username",
        password: "password"
    };

    const updateCredential = async(e, credentialType, credentialValue) => {
        e.preventDefault();

        const AuthorizationToken = localStorage.getItem("accessToken");

        try{
            const updateCredentialUrl = "http://localhost:8080/api/products";
            // let payload = {username: "", password:""};
            let payload = {};

            switch(credentialType){
                case CREDENTIALTYPES.username:{
                    payload.username = credentialValue;
                    break;
                }
                case CREDENTIALTYPES.password:{
                    payload.password = credentialValue;
                    break;
                }
                default:{
                    throw new Error("Invalid field type. credentialType is of value "+credentialType.toString());
                }
            }

            console.log(payload);
            const res = await axios.post(updateCredentialUrl, {credentialType: credentialValue}, {
                headers: {
                    Authorization: `Bearer ${AuthorizationToken}`
                },
            });


            console.log("Update successful:", res.data);
            return res.data;
        } catch (error) {
            console.error("Error updating credential:", error.message);
            throw error;
        }
    }

    const getCredentialTypes = () =>{
        return CREDENTIALTYPES;
    }

    return {
        updateCredential,
        getCredentialTypes
    };
};

