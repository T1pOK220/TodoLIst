import { createContext, useState, useContext, useEffect} from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState([]);
   useEffect(() => {
  const verifyToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/verify-token', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
        console.log(userData.user)
      } else {
        logout(); // Токен невалідний
      }
    } catch (error) {
      console.error('Помилка перевірки токена:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };
  
  if (token) {
    verifyToken();
  } else {
    setLoading(false);
  }
}, [token]);
  const login = async (FormData) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(FormData)
      });

      const data = await response.json();
      if (response.status == 400) {
        return data;
      }
      if (response.ok) {
        console.log(data)
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Помилка мережі' };
    }
  };
const EditEmail = async (id,emali) => {
  try {
    if (emali == "" || emali == null) {
      console.log("Емейл пустий")
      return;
      }
        const FormBody = {
            id: id,
            NewEmali:emali
        }
        const response = await fetch("http://localhost:5000/api/EditEmail", {
            method: "PATCH",
             headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
            },
             body:JSON.stringify(FormBody)
        })
        const data = await response.json();
        if (response.ok) {
        console.log(data)
        setToken(data.newToken);
        setUser(data.user);
        localStorage.setItem('token', data.newToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
        } else {
          console.log(data.error)
          return { success: false, error: data.error };
          
      }
    }
    catch(err){console.log(err)}
}
const EditUserName = async (id,newUserName) => {
    try {
        const FormBody = {
            id: id,
            NewUserName:newUserName
        }
        const response = await fetch("http://localhost:5000/api/EditUserName", {
            method: "PATCH",
             headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
            },
             body:JSON.stringify(FormBody)
        })
        const data = await response.json();
        if (response.ok) {
        console.log(data)
        setToken(data.newToken);
        setUser(data.user);
        localStorage.setItem('token', data.newToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
        } else {
          console.log(data.error)
        return { success: false, error: data.error };
      }
    }
    catch(err){console.log(err)}
}
const EditPassword = async (id,newPassword,oldPasswords) => {
    try {
        const FormBody = {
            id: id,
            NewPassword: newPassword,
            OldPassword:oldPasswords
        }
        const response = await fetch("http://localhost:5000/api/EditPassword", {
            method: "PATCH",
             headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
            },
             body:JSON.stringify(FormBody)
        })
        const data = await response.json();
       if (response.ok) {
        console.log(data)
        setToken(data.newToken);
        setUser(data.user);
        localStorage.setItem('token', data.newToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
       } else {
        return { success: false, error: data.error };
      }
    }
    catch(err){console.log(err)}
}

  const todo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        console.log("Немає відповіді від серверу")
      }
      const data = await response.json();
      console.log(data.filterItems)
      setTodos(data.filterItems)

    }
    catch (err) {
        console.log("Проблеми з відправленням на сервер:",err)
    }
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    todos,
    login,
    logout,
    todo,
    EditEmail,
    EditUserName,
    EditPassword,
    loading,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};