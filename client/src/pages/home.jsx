
import Header from "../components/header.jsx"
import { useAuth } from "../Context/AuthContext.jsx";
import MainContent from "../components/MainContent.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from '../FallbackUI/Fallback.jsx'
const Home = () => {
    const { user } = useAuth();
    return (<>
        <Header user={user} />
        <ErrorBoundary FallbackComponent={ErrorFallback}
      onReset={() => {
      }}>
                 <MainContent/>
        </ErrorBoundary>
    </>)
}
export default Home;