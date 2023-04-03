import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext);
    // check se un utente si è autenticato, allora passa tutte le props al figlio
  // e quella Route sarà renderizzata, altrimenti fa una redirezione alla pagina di login
  return <Route {...rest}>{!user ? <Redirect to="/login" /> : children}</Route>;
};

export default PrivateRoute;

