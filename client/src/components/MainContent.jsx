import { use, useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext"
import "../styles/mainContent.css"
import { del, timer, getStatus, formatDateTime } from "../Apies/function";
import { deleteAll,CompletedAll} from "../Apies/Api";
const MainContent = () => {
    const { todos, todo, token, user } = useAuth();
    const [isEdit, setIsEdit] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [itemId, setItemId] = useState("");
    const [expandedItemId, setExpandedItemId] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectIds, setSelectIds] = useState([]);
    console.log(todos);
    const SelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
                   setSelectIds(todos);
        }
        else {
            setSelectIds([]);
            console.log("Невдалось вибрати всі")
        }
    }
const select = (id) => {
    const selectedItem = todos.find(item => item.id === id);
    
    if (selectedItem) {
        setSelectIds(prev => {
            const alreadyExists = prev.some(item => item.id === id); 
            
            if (alreadyExists) {

                return prev.filter(item => item.id !== id);
            } else {
                return [...prev, selectedItem];
            }
        });
    }
    console.log("Вибрано елемент:", selectedItem);
};


 const IsSelect = (id) => {
    if (selectIds.length === 0) return false;
    return selectIds.some(item => item.id === id);
};
    const send = async (id,completed) => {
        const FormBody = {
            id: id,
            completed: completed ? 1 : 0
        }
        try {
            const response = await fetch("http://localhost:5000/api/update-item", {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(FormBody)
            })
            if (!response.ok) {
                console.log("невдалось отримати відповідь")
            }
            const data = await response.json();
            console.log(data);
            todo();
        }
        catch (error) {
            console.log("Невдалось відпраити запит на сервер",error)
        }
    }
    const handleTitle = (e) => {
        setNewTitle(e.target.value)
    }
    const handleDelete = async(id) => {
            try {
                await del(id, token, () => {
                    todo();
                });
            }
            catch (err) {
                console.log(err)
            }
        }
    const handleToggle = async(id,curentCheked) => {
        const newCheked = !curentCheked;
        try {
            await send(id, newCheked) 
            
        }
        catch (err) {
            console.log("невдалось відправити")
        }
    }
    const updateItem = async (e) => {
        e.preventDefault();
        try {
            const FormBody = {
                id: itemId,
                title:newTitle
            }
            console.log("SEND:", itemId, newTitle);
            const response = await fetch("http://localhost:5000/api/update", {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(FormBody)
            })
            const data = await response.json();
            if (!response.ok) {
                console.log(data.error)
            }
            console.log(data);
            todo();
            setIsEdit(!isEdit)
            setNewTitle("")
        }
        catch (err) {
            console.log(err)
        }
    }
    const edit = (id) => {
        setIsEdit(!isEdit);
        setItemId(id);
    }
    const HandleDeleteAll = async() => {
        try { 
            if (selectIds.length < 1) {
                return alert("Ви не вибрали елементів")
            }
            await deleteAll(user.id, selectIds, token)
            await todo();
        }
        catch (err) {
            console.log(err)
            
        }
    }
    const HandleCompletedAll = async () => {
        try {
            if (selectIds.length < 1) {
                return alert("Ви не вибрали елементів")
            }
            const completedValue = selectIds.some(item => item.completed == false);
            console.log(completedValue)
            const newArr =  await CompletedAll(user.id,selectIds,token,completedValue);
            await todo();
            console.log(newArr)
            setSelectIds(newArr.arr)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        todo();
    },[])
    return (
        <div>
            <div className="itemsDo">
               {todos.length > 0 ?(<div className="navTool">{todos.length > 0 ? <label className="activeDo">Всі завдання</label> : null} {todos.length>0?<div className="tools"><div className="CheckBox-div"> <label>Вибрати всі</label>
                    <input type="checkBox" className="checkBox" id="selectAll" checked={selectAll}/>
                        <label className={!selectAll?"boxGrey":"arrowGrey"} htmlFor="selectAll"   onClick={SelectAll} >
                        </label>
                    </div><img className="delete" src="../public/free-icon-delete-6932392.png" alt="" onClick={HandleDeleteAll} />
                    <div className="CheckBox-div">
                    <label className="arrow" onClick={HandleCompletedAll}></label>
                    </div>
                </div>:null}
                </div>):null} 
            {todos.length < 1 ? (<p className="notification">Немає записаних завдань</p>):(<ul className="list">{todos.map((item) => (
                <li className="item" key={item.id}><div><div className="title">{item.title}</div>
                    {expandedItemId === item.id&&(<div className="additionalInfo"><p className="data">Дата та час створення: <span className="date">{formatDateTime(item.created_at)}</span></p>
                    {item.deadline !== null ? (<p className="data">Дата та час завершення: <span className="date">{formatDateTime(item.deadline)}</span></p>) : null}
                        <p className="data">Залишилось часу до виконанння: <span className="date">{timer(item.deadline).text}</span></p></div>)}
                </div>
                    <p className={getStatus(item.completed, item.deadline).className}>{ getStatus(item.completed,item.deadline).text}</p>
                    <div className="tools"><img className="edit" src="../public/free-icon-delete-6932392.png" alt="" onClick={() => { handleDelete(item.id) }} /><img className="edit" src="../public/free-icon-pencil-4347485.png" alt="" onClick={() => edit(item.id)} />
                    <div className="CheckBox-div">
                    <input type="checkBox" id={`check-${item.id}`} className="checkBox" onChange={() => { handleToggle(item.id,item.completed) }}
                        checked={item.completed} />
                    <label htmlFor={`check-${item.id}`} className={item.completed? "arrow" :"box"}></label>
                        </div></div>
                    <div className="CheckBoxDiv">
                        <input type="checkBox" className="checkBox" id={`checkS-${item.id}`}  checked={selectAll || IsSelect(item.id)}
    onChange={() => select(item.id)} />
                        <label className={selectAll || IsSelect(item.id) ? "arrowGrey" : "boxGrey"} htmlFor={`checkS-${item.id}`}  >
                        </label>
                    </div><span className={expandedItemId === item.id ? "ArrowTopAdditional" : "ArrowBottomAdditional"} onClick={() => { setExpandedItemId(expandedItemId === item.id ? null : item.id); }}></span>
                </li>
            ))}</ul>)}
            </div>
            {isEdit ? (<div className="wrraper"><div className="hidden-form">
                <h3>Редагування</h3>
                <form action="" onSubmit={updateItem}>
                    <input type="text" onChange={handleTitle} value={newTitle} placeholder="Назва" className="item" /><br/>
                    <button className="btnAdd">Змінити</button>
                </form>
                <img className="close" src="../public/free-icon-close-4013407.png" onClick={() => { setIsEdit(!isEdit) }} alt=""/>
            </div></div>):null}
            </div>
    )
}
export default MainContent;