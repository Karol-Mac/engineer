import { useEffect, useState } from "react";
import RollbackPage from "../components/generic/RollbackPage";

const Login = () => {

    return (
        <div>
            <div id="leftVertical" class="verticalSeparator"> {/* Pionowy div dla czesci logowania */}
                <h2>Login</h2>
                <form action="" method="post">
                    <label for={"login"}/>
                        <input type="text" name={"login"} value={""}>Email or login</input>

                    <label for={"password"}/>
                        <input type="text" name={"password"} value={""}>Email or login</input>

                </form>
            </div>
            <div id="rightVertical" class="verticalSeparator"> {/* Pionowy div dla czesci logowania */}
                <h2>Doesn't have an account?</h2>
                <a href={"/signup"}>Create an account</a>
                <h6>why is it worth to have an account on PLACEHOLDER NAME</h6>
                <img src={"img1"} alt={"img1Placeholder"}/>
                <img src={"img2"} alt={"img2Placeholder"}/>
                <img src={"img3"} alt={"img3Placeholder"}/>
                <img src={"img4"} alt={"img4Placeholder"}/>
            </div>
            <RollbackPage/>
        </div>

)
    ;

};

export default Login;