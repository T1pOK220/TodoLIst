import Header from "../components/header";
import UserInfo from "../components/UserInfo";
import { useAuth } from "../Context/AuthContext";

const Profile = () => {
    const { user } = useAuth();
    return (
        <>
            <Header user={user} />
            <UserInfo user={user}/>
        </>
    )
}
export default Profile;