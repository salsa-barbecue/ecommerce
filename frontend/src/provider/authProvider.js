import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import {setDefaultHeader} from "../utils/queries";

const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {

    const [token, setToken_] = useState(localStorage.getItem("token"));

    const setToken = (newToken) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem('token',token);
            setDefaultHeader(token)
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};



export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;