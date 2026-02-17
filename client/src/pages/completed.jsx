import Header from "../components/header"
import { useAuth } from "../Context/AuthContext"
import CompletedItem from "../components/CompletedItem";
const Completed = () => {
    const { user} = useAuth();
    return (
        <>
            <Header user={user} />
            <CompletedItem/>
            
        </>
    )
}
export default Completed;