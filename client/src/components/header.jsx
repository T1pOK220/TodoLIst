import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css"
const Header = ({ user }) => {
    const navigate = useNavigate();
    return (
        <header className="navigation">
            <h1 onClick={() => {
                navigate("/home")
            }}>ToDo</h1>
            <nav>
                <Link to="/overdue">Завершені</Link>
                <Link to="/completed">Виконані</Link>
                <Link to="/add">Додати завдання</Link>
                <Link to="/activeDo">Активні</Link>
            </nav>
            <div className="profile-block"> <img src="../free-icon-profile-13126995.png" alt="default avatar" className="avatar" onClick={() => {
                navigate("/profile")
            }} /> {user ? <label onClick={() => {
                navigate("/profile")
            }}>{user.userName}</label> : <label>?</label>}
            </div>
         </header>
    )
}
export default Header;