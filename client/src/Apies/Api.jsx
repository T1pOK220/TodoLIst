
export const deleteAll = async(id,selectedItem,token) => {
    try { 
        const FormBody = {
            id: id,
            arrayItem :selectedItem
        }
        const response = await fetch("http://localhost:5000/api/deleteAll", {
            method: "DELETE",
             headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(FormBody)
        })
        const data = await response.json();
        if (!response.ok) {
            console.log(data.error)
        }
        console.log(data);
    }
    catch (err) {
        console.log("Невдалось відправити запит")
    }
}
export const CompletedAll = async (id,selectedItem,token,completed) => {
    try {
        const FormBody = {
            id: id,
            arrayItem: selectedItem,
            completed:completed
        }
        const response = await fetch("http://localhost:5000/api/completedAll", {
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
        return data;
    }
    catch(err){console.log(err)}
}
export const deleteUser = async(token) => {
    try {
        const response = await fetch("http://localhost:5000/api/deleteUser", {
            method: "DELETE",
             headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (!response.ok) {
            console.log(data.error)
        }
        console.log(data)
    }
    catch (err) {
        console.log(err)
    }
}
export  const getCompleted = async(token) => {
        try {
            const response = await fetch("http://localhost:5000/api/completed", {
                method: "GET",
                headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
            })
            const data = await response.json();
            if (!response.ok) {
                console.log(data.error);
            }
            console.log(data)
            return data.completedItems;
        }
        catch (err) {
            console.log(err)
        }
    }