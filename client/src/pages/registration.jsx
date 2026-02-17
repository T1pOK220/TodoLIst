import { useState } from "react";
import "../styles/App.css";
import { useNavigate } from "react-router-dom";
const Registration = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const handleUserName = (e) => {
        setUserName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const showPassword = () => {
        setShow(!show)
    } 
    const send = async (e) => {
        e.preventDefault();
        try {
            if (email == "" || password == "" || userName == "") {
                setErr("Поля не можуть бути пустими")
                return;
             } ;
             if (!email.includes("@")) {
                 setErr("ви ввели не вірний емейл")
                 return;
             }
              if (password.length < 6) {
                 setErr("Пароль має містити більше 6 символів")
                 return;
            }
            const formData = {
                userName: userName,
                email: email,
                password:password
            }
            const response = await fetch("http://localhost:5000/api/registration", {
                method: "POST",
                headers: {
                   'Content-Type': 'application/json'
                //    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
              const data = await response.json()
            if (response.status == 400) {
                setErr(data.error)
            }
             if (response.status == 500) {
                console.log(data.error)
            }
            if (!response.ok) {
                return
            }
            console.log(data)
              setUserName("")
            setPassword("")
            setEmail("")
            setErr("")
            navigate("/")
        }
        catch(err){
            console.log("Помилка при відправці данних на сервер", err)
        }
    }
    return (
        <div className="wrapperReg">
         <form onSubmit={send} className="registration-from">
            <div className="header">
         <h2>Registration</h2>
            </div>
            <div className="inputs">
                <div className="input-block">
                    <label for="userName" className="lables" >Ім'я користувача</label><br/>
                    <input type="text" id="userName" value={userName} onChange={handleUserName} placeholder=" " />
                </div>
                <div className="input-block">
                     <label for="email"  className="lables">еmail</label> <br/>
                    <input type="email" id="email" value={email} onChange={handleEmail} placeholder=" " />
                </div>
                <div className="input-block">
                    <label for="password" className="lables" >Пароль</label> <br/>
                    <input type={show ? "text" : "password"} id="password" value={password} onChange={handlePassword} placeholder=" " />
                       {show ? <img onClick={showPassword} src="../free-icon-hide-2767146.png" className="eye"></img>:<img onClick={showPassword} src="../free-icon-open-eye-829117.png" className="eye"></img>}
                </div>
                 <div> <button className="btn">Зареєструватись</button></div>
            </div>
                    <div className="Test">{err && <p>{err}</p>}</div>
            </form>
         </div>
    )
}
export default Registration;