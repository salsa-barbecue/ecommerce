import {useAuth} from "../provider/authProvider";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

import TextInput from "../components/form/textInput";
import Button from "../components/generalUi/button";
import {doLogin} from "../utils/queries";

const LoginForm = () => {
    const {setToken} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        doLogin(username, password).then(r => {
            setToken(r.token)
            navigate("/", {})
        }).catch(err => {
            console.log(err)
        })
    };

    return (
        <form className="space-y-6">
            <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                </label>
                <div className="mt-2">
                    <TextInput
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value)
                        }}
                        autoComplete="username"
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                </label>
                <div className="mt-2">
                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                        autoComplete="current-password"
                        required
                    />
                </div>
            </div>
            <div>
                <Button
                    onClick={(e) => {
                        e.preventDefault()
                        handleLogin()
                    }}
                >
                    Login
                </Button>
            </div>
        </form>
    );

}

export default LoginForm