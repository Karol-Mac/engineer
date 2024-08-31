import { useEffect, useState } from "react";
import RollbackPage from "../components/generic/RollbackPage";

const Login = () => {
    const [loginData, setLoginData] = useState({ email: "", password: "" });

    const handleChange = ({ currentTarget: input }) => {
        setLoginData({ ...loginData, [input.name]: input.value });
    };

    const handleLogin = async(e) =>{
        e.preventDefault();

        try {
            const loginUrl = "/api/auth/login";
            const {loginData: res} = await axios.post(loginUrl, loginData);
            localStorage.setItem("accessToken", JSON.stringify(res));
            localStorage.setItem("tokenType", JSON.stringify(res));
            localStorage.setItem("user", JSON.stringify(res.data.user));
        }catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div>
            <div id="leftVertical" class="verticalSeparator"> {/* Pionowy div dla czesci logowania */}
                <h2>Login</h2>
                <form onSubmit={handleLogin} method="post">
                    <label for="login"/>
                        <input
                            type="text"
                            name="login"
                            hint="login"
                            onChange={handleChange}
                            value={loginData.email} >
                            Email or login
                        </input>

                    <label for={"password"}/>
                        <input
                            type="text"
                            name="password"
                            hint="password"
                            onChange={handleChange}
                            value={loginData.password} >
                            Password
                        </input>

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