import { useState } from "react";
import Header from "../components/header";
import { useAuth } from "../Context/AuthContext";

const AddTodo = () => {
    const [title, setTitle] = useState("");
  const { user, token } = useAuth();
  const [deadline, setDedline] = useState();
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const addTodo = async (e) => {
        e.preventDefault();
   if (!token) {
      console.error('Користувач не авторизований');
      return;
    }
    const FormBody = {
      title: title,
      completed: false,
      deadline:deadline
    }
    try {
      const response = await fetch('http://localhost:5000/api/addtodo', {
        method: "POST",
        headers: {
           'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(FormBody)
      })
      if (!response.ok) {
        console.log( await response.json())
      }
      const data =  await response.json();
        console.log(data);
        setTitle("")
    }
    catch (err) {
      console.log("Невдалось відправити запит на сервер Причина:",err)
    }
    
  }
  const handleDate = (e) => {
    setDedline(e.target.value)
  }
    return (<>
      <Header user={user} />
      <div className="addPageForm">
        <form onSubmit={addTodo} className="addForm">
            <div>
        <h2 >Додати завдання </h2>
            </div>
            <div className="inputs">
                <div className="addItem-block">
              <input type="text" id="title" className="item" value={title} onChange={handleTitle} placeholder="Назва завдання " />
              <label htmlFor="" className="datetime-lable">Дата завершення завдання</label><br/>
              <input type="datetime-local" className="datetime-input" value={deadline} onChange={handleDate}/>
                </div>
                 <div className="buttonBox"> <button className="btnAdd">Додати завдання </button></div>
            </div>
        </form>
      </div></>)
}
export default AddTodo;