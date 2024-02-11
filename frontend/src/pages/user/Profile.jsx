import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const onLogoutRequest = () => {
        navigate("/logout", { replace: true });
    };

    return <>Profile</>;
};

export default Profile;