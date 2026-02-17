import { use, useState } from "react"
import "../styles/profile.css"
import { useAuth } from "../Context/AuthContext";
import { deleteUser } from "../Apies/Api";
const UserInfo = ({ user }) => {
    const [isEdit, setIsEdit] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [Error, setError] = useState("");
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const { EditEmail, EditPassword, EditUserName,logout,token} = useAuth();
    const Edit = async (e) => {
        e.preventDefault()
        try { 
             if (isEdit == "email") {
                 const isEdits = await EditEmail(user.id, newEmail);
                 if (isEdits.success) {
                     setNewEmail("");
                      setIsEdit("");
                 }
            }
                 if (isEdit == "password") {
                     const isEdits = await EditPassword(user.id, newPassword, oldPassword);
                      if (isEdits.success) {
                     setNewPassword("");
                          setOldPassword("");
                           setIsEdit("");
                 }
                     setError(isEdits.error);
        }
             if (isEdit == "userName") {
                 const isEdits = await EditUserName(user.id, newUserName)
                 if (isEdits.success) {
                     setNewUserName("")
                     setIsEdit("");
                 }
        }
        } catch (err) {
            console.log(err)
        }
       
    }
    const showPasswordOLd = () => {
        setShowOld(!showOld)
    } 
    const showPasswordNew = () => {
        setShowNew(!showNew)
    } 
    const HandleNewPassword = (e) => {
        setNewPassword(e.target.value)
    }
    const HandleOldPassword = (e) => {
        setOldPassword(e.target.value)
    }
    const HandleEmail = (e) => {
        setNewEmail(e.target.value)
    }
    const HandleNewUserName = (e) => {
        setNewUserName(e.target.value)
    }
    const DeleteAccount = async(e) => {
        e.preventDefault();
        try {
            const isDelete = confirm("Ви точно хочете видали свій акаунт?")
            if (isDelete) {
                await deleteUser(token);
            logout();
            }
            else {
                console.log("ви не підтвердили")
                return;
            }
        } catch (err) {
            console.log(err)
            
        }
    }
    return (
        <div className="user-profile">
            <h4>Профіль</h4>
            <div className="card">
                <div className="img-box">
                    <img src="../free-icon-profile-13126995.png" alt="default avatar" className="avatar-User" />
                </div>
                <div className="userNameBox">
                   {user ? <label className="UserName" >{user.userName}</label> : <label>?</label>}
                </div>
                <div className="logOutAndTool"><div className="EditToolBox">
                    <div className="editBox"><label htmlFor="" className="LableProfile">Email:</label>
                        <p className="placeholders">{user.login}</p>
                        <button className="EditBtn" onClick={() => { setIsEdit("email") }}>Edit</button>
                    </div>
                    <div className="editBox"><label htmlFor="" className="LableProfile">Name:</label>
                        <p className="placeholders"> {user.userName}</p>
                        <button className="EditBtn" onClick={() => { setIsEdit("userName") }}>Edit</button>
                    </div>
                    <div className="editBox"><label htmlFor="" className="LableProfile">Password:</label>
                        <p className="placeholders">***********</p>
                        <button className="EditBtn" onClick={() => { setIsEdit("password") }}>Edit</button>
                    </div>
                </div>
                    <div className="logOutBox">
                    <button onClick={DeleteAccount} className="DeleteBtn">Видалити акаунт</button><br/>
                    <label onClick={() => { logout() }} className="logOut">Вийти за акаунту</label>
                </div>
                </div>
                 {isEdit == "email" ? (<div className="wrraper"><div className="hidden-form">
                <h3>Редагування</h3>
                <form action="" onSubmit={Edit}>
                    <input type="text" onChange={HandleEmail} value={newEmail} placeholder="email" className="item" /><br/>
                    <button className="btnAdd">Змінити</button>
                </form>
                <img className="close" src="../public/free-icon-close-4013407.png" onClick={() => { setIsEdit("") }} alt=""/>
                </div></div>) : null}
                {isEdit == "password" ? (<div className="wrraper"><div className="hidden-form">
                <h3>Редагування</h3>
                <form action="" onSubmit={Edit}>
                        <input type={showNew ? "text" : "password"} onChange={HandleNewPassword} value={newPassword} placeholder="New password" className="item" /><br />
                          {showNew ? <img onClick={showPasswordNew} src="../free-icon-hide-2767146.png" className="eye-newPassword"></img>:<img onClick={showPasswordNew} src="../free-icon-open-eye-829117.png" className="eye-newPassword"></img>}
                        <input type={showOld ? "text" : "password"} onChange={HandleOldPassword} value={oldPassword} placeholder="Old password" className="item" /><br />
                          {showOld ? <img onClick={showPasswordOLd} src="../free-icon-hide-2767146.png" className="eye-oldPassword"></img>:<img onClick={showPasswordOLd} src="../free-icon-open-eye-829117.png"  className="eye-oldPassword"></img>}
                        {Error !== "" && (<div>{Error}</div>)}
                    <button className="btnAdd">Змінити</button>
                </form>
                <img className="close" src="../public/free-icon-close-4013407.png" onClick={() => { setIsEdit("") }} alt=""/>
                </div></div>) : null}
                {isEdit == "userName" ? (<div className="wrraper"><div className="hidden-form">
                <h3>Редагування</h3>
                <form action="" onSubmit={Edit}>
                    <input type="text" onChange={HandleNewUserName} value={newUserName} placeholder="User name" className="item" /><br/>
                    <button className="btnAdd">Змінити</button>
                </form>
                <img className="close" src="../public/free-icon-close-4013407.png" onClick={() => { setIsEdit("") }} alt=""/>
                </div></div>) : null}
            </div>
        </div>
    )
}
export default UserInfo;