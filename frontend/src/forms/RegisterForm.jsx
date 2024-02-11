import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import TextInput from "../components/form/textInput";
import Button from "../components/form/button";
import {useAuth} from "../provider/authProvider";

const RegisterForm = () => {
    const {setToken} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);

    //registers the new user and then logs him in automatically, saving the token in asyncstorage
    const handleRegister = () => {
        let payload = JSON.stringify({
            username: username,
            password: password
        })
        //loading animation?
        let registerCallConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/user/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: payload
        };
        let loginCallConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/user/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: payload
        };

        axios.request(registerCallConfig)
            .then(() => {
                axios.request(loginCallConfig)
                    .then((response) => {
                        setToken(response.data?.data?.token)
                        localStorage.setItem('username', username)
                        navigate("/", {replace: true});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
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
                    onClick={e => {
                        console.log("AAAAAAAAAA")
                        e.preventDefault()
                        handleRegister()
                    }}
                >
                    Registrati
                </Button>
            </div>
        </form>
    );

}

export default RegisterForm