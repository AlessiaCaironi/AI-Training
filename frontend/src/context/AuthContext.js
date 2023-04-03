import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode"; // decodifica i token JWT
import { useHistory } from "react-router-dom";

// context fornisce un modo per passare dati tra i componenti padri/figli 
// lungo l'albero dei componenti, senza dover passare manualmente le props
// tra i vari livelli. In questo modo posso importare AuthContext in qualsiasi 
// file presente nella cartella src
const AuthContext = createContext();

export default AuthContext;

// contiene l'intera app
export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  // funzione per fare login di un utente ed ottenere i token. 
  // Se l'utente presente nel db (credenziali valide), allora l'utente è loggato. 
  // I due token ricevuti (access e refresh) sono salvati nel local storage.
  const loginUser = async (username, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/protected");
    } else {
      alert("Something went wrong!");
    }
  };
  
  // funzione per registrare un nuovo utente nel db.
  // se la registrazione ha successo, l'utente viene reindirizzato alla pagina di login.
  const registerUser = async (username, password, password2) => {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        password2
      })
    });
    if (response.status === 201) {
      history.push("/login");
    } else {
      alert("Something went wrong!");
    }
  };

  // funzione per fare logout di un utente. Rimuove i token dal local storage.
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};