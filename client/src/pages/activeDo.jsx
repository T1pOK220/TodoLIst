import ActiveComponent from "../components/Active";
import Header from "../components/header";
import { useAuth } from "../Context/AuthContext";

const Active = () => {
    const { user,todos} = useAuth();
    return (<>
        <Header user={user} />
        <ActiveComponent  />
    </>)
}
export default Active;