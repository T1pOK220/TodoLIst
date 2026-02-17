
import { useAuth } from "../Context/AuthContext";
import { getStatus,timer,formatDateTime} from "../Apies/function";
import { use, useEffect, useState } from "react";
const ActiveComponent = () => {
    const { todo, todos } = useAuth();
    const [expandedItemId, setExpandedItemId] = useState();
    const newMass = todos.filter(item => (
        getStatus(item.completed, item.deadline).isActive
    ))
    console.log(newMass)
    useEffect(() => {
        todo();
    }, [])
    return (<div>
        <div className="itemsDo">
                    {newMass.length > 0 ? <label className="activeDo">Активні завдання</label>:null}
                    {newMass.length < 1 ? (<p className="notification">Немає записаних завдань</p>):(<ul className="list">{newMass.map((item) => (
                        <li className="item" key={item.id}><div className="textLi">{item.title}
                        </div>
                             {expandedItemId === item.id&&(<div className="additionalInfo"><p className="data">Дата та час створення: <span className="date">{formatDateTime(item.created_at)}</span></p>
                                                {item.dedline !== null ? (<p className="data">Дата та час завершення: <span className="date">{formatDateTime(item.deadline)}</span></p>) : null}
                                                    <p className="data">Залишилось часу до виконанння: <span className="date">{timer(item.deadline).text}</span></p></div>)}
                            <p className={getStatus(item.completed, item.deadline).className}>{getStatus(item.completed, item.deadline).text}</p>
                            <span className={expandedItemId === item.id ? "ArrowTopAdditional":"ArrowBottomAdditional"} onClick={()=>{ setExpandedItemId(expandedItemId === item.id ? null : item.id);}}></span>
                            </li>
                    ))}</ul>)}
                    </div>
     </div>)
}
export default ActiveComponent;