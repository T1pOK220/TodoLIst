
export const del = async (id,token,callback) => {
        const FormBody = {
            id: id
        }
        try {
            const response = await fetch("http://localhost:5000/api/delete-item", {
                method: "DELETE",
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
            callback();
        }
        catch (error) {
            console.log("Невдалось відпраити запит на сервер",error)
        }
}
export const getStatus = (completed, dedline) => {
     const Startdate = new Date();
        const endDates = new Date(dedline);
        const DiffTime = endDates.getTime() - Startdate.getTime();
    const TotalMinutes = Math.floor(DiffTime / (1000 * 60));
        // console.log('Тест:', { Startdate, endDates, DiffTime, TotalMinutes });
        if (TotalMinutes>=1) {
            if (completed) {
                return {
                    text:"Виконано",
                    className:"CompletedDo",
                    isCompleted: true,
                    isActive: false,
                    isDisable: false
                }
            }
            else return {
               text: "Активне",
               className:"ActiveDo",
               isCompleted: false,
               isActive: true,
               isDisable: false
            }
        }
        else {
            return {
                text:"Час вийшов",
                className: "DiseableDo", 
                isCompleted: false,
                isActive: false,
                isDisable: true
            }
    }
}
export const timer = (endDate) => {
        const Startdate = new Date();
        const endDates = new Date(endDate);
        const DiffTime = endDates - Startdate;
        const TotalMinutes = Math.floor(DiffTime / (1000 * 60));
        const days = Math.floor(TotalMinutes / (60 * 24));
        const hours = Math.floor((TotalMinutes % (60 * 24)) / 60);
        const minutes = TotalMinutes % 60;
        return {text: TotalMinutes>=1 ? `${days} днів ${hours} годин ${minutes} хвилин`: `0 днів 0 годин 0 хвилин`,
            isActive: TotalMinutes >= 1
        };
}
 export const formatDateTime=(dateString)=> {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Невірна дата';
  }
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
    }