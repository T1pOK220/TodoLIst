import { useEffect, useState } from "react";
import "../styles/App.css";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [err, setErr] = useState({ email: "", password: "" });
    const [backErr, setBackErr] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
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
                  if (email == "") {
            setErr(prev => ({...prev,email:"Поле пусте"}))
            return ;
        } else {
               setErr(prev => {
        const newErr = { ...prev };
        delete newErr.email;
        return newErr;
    });
        }
        if (password == "") {
            setErr(prev => ({...prev,password:"Поле пусте"}))
            return ;
        } else {
               setErr(prev => {
        const newErr = { ...prev };
        delete newErr.password;
        return newErr;
    });
        }
            const formData = {
                email: email,
                password:password
            }
            const result = await login(formData);
            if (result.success) {
                navigate('/home'); 
            }
            else {
                setBackErr(result.error);
             }
            setPassword("")
            setEmail("")
            setErr("")
        }
        catch(err){
            console.log("Помилка при відправці данних на сервер", err)
        }
    }
    // useEffect(() => {
    //     const IsDisable = validator(email, password);
    //     setDissable(!IsDisable);
    // },[email,password])
    return (<>
        <div className="wrapperReg">
        <form onSubmit={send} className="registration-from">
            <div className="header">
        <h2>Login</h2>
            </div>
            <div className="inputs">
                <div className="input-block">
                     <label for="email"  className="lables">еmail</label> <br/>
                        <input type="email" id="email" value={email} onChange={handleEmail} placeholder=" " />
                        {err.email && <div className="Test">{err.email}</div>}
                </div>
                <div className="input-block">
                    <label for="password" className="lables" >Пароль</label> <br/>
                    <input type={show ? "text" : "password"} id="password" value={password} onChange={handlePassword} placeholder=" " />
                        {show ? <img onClick={showPassword} src="../free-icon-hide-2767146.png" className="eye"></img> : <img onClick={showPassword} src="../free-icon-open-eye-829117.png" className="eye"></img>}
                         {err.password && <div className="Test">{err.password}</div>}
                </div>
                 <div> <button className="btn">Увійти</button></div>
            </div>
                <p className="ToReg">У вас немає акаунту? <br /> <Link to={"/registration"} className="">Зареєструватись</Link></p>
                 {backErr !== "" ? (<p className="Test">{ backErr}</p>):null}
            </form>
            </div>
        </>

    )
}
export default Login;