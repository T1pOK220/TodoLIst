import { useEffect } from "react";
import { useState } from "react";
import { del } from "../Apies/function";
import { useAuth } from "../Context/AuthContext";
import { getCompleted } from "../Apies/Api";
const CompletedItem = () => {
    const [completed, setComleted] = useState([]);
    const { token } = useAuth();
    console.log(completed)
    const GetAllCompleted = async() => {
        const arrCompleted = await getCompleted(token)
        setComleted(arrCompleted)
    }
    const handleDelete = async(id) => {
        try {
            await del(id, token, () => {
                getCompleted();
            });
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        GetAllCompleted();
    },[])
    return (
        <section>
            <div className="itemsDo">
            {completed.length > 0 ? <label className="activeDo">Виконані завдання</label>:null}
            {completed.length < 1 ? (<p className="notification">Немає виконаних завдань</p>):(<ul className="list">{completed.map((item) => (
                <li className="completedItem" key={item.id}>{item.title}<div className="tools"><img className="edit" src="../public/free-icon-delete-6932392.png" alt="" onClick={() => { handleDelete(item.id) }} />
                 <label for="check" className="circkle"></label>  </div></li>
            ))}</ul>)}
            </div>
        </section>
    )
}
export default CompletedItem;