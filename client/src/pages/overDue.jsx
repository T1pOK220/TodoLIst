import Header from "../components/header";
import OverDueItmes from "../components/OverDueItmes";
import { useAuth } from "../Context/AuthContext";

const OverDue = () => {
    const { user } = useAuth();
    return (<>
        <Header user={user} />
        <OverDueItmes/>
    </>)
}
export default OverDue;