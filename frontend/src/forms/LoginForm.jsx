import {useAuth} from "../provider/authProvider";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

import TextInput from "../components/form/textInput";
import Button from "../components/generalUi/button";
import {doLogin} from "../utils/queries";
import Alert from "../components/generalUi/alert";

const LoginForm = () => {
    const {setToken} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(undefined)

    const handleLogin = () => {
        if(username.length < 3 || password.length < 3){
            setAlert({
                type: "error",
                msg: "Username o password mancanti o non conformi"
            })
            return;
        }

        doLogin(username, password).then(r => {
            setToken(r.token)
            navigate("/", {})
        }).catch(err => {
            setAlert({
                type: "error",
                msg: err.response.data.msg
            })
        })
    };

    const dismissMsg = () => {
        setAlert(undefined)
    }

    return (
        <>
            {alert&&<Alert dismissMsg={dismissMsg} alert={alert}/>}
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
        </>

    );

}

export default LoginForm