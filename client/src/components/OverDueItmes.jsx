import { useAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import { getStatus,timer,formatDateTime } from "../Apies/function";
const OverDueItmes = () => {
       const { todo, todos } = useAuth();
        const [expandedItemId, setExpandedItemId] = useState();
        const newMass = todos.filter(item => (
            getStatus(item.completed, item.deadline).isDisable
        ))
        console.log(newMass)
        useEffect(() => {
            todo();
        }, [])
    return (<div>
        <div className="itemsDo">
                            {newMass.length > 0 ? <label className="activeDo">Завершені завдання</label>:null}
                            {newMass.length < 1 ? (<p className="notification">Немає завершених завдань</p>):(<ul className="list">{newMass.map((item) => (
                                <li className="item" key={item.id}><div className="textLi">{item.title}
                                </div>
                                     {expandedItemId === item.id&&(<div className="additionalInfo"><p className="data">Дата та час створення: <span className="date">{formatDateTime(item.created_at)}</span></p>
                                                        {item.dedline !== null ? (<p className="data">Дата та час завершення: <span className="date">{formatDateTime(item.dedline)}</span></p>) : null}
                                                            <p className="data">Залишилось часу до виконанння: <span className="date">{timer(item.dedline).text}</span></p></div>)}
                                    <p className={getStatus(item.completed, item.dedline).className}>{getStatus(item.completed, item.dedline).text}</p>
                                    <span className={expandedItemId === item.id ? "ArrowTopAdditional":"ArrowBottomAdditional"} onClick={()=>{ setExpandedItemId(expandedItemId === item.id ? null : item.id);}}></span>
                                    </li>
                            ))}</ul>)}
                            </div>
    </div>)
}
export default OverDueItmes;