import React from "react";
import "./index.css";
import NavCustomized from "./components/NavCustomized";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import MainCustomized from "./components/MainCustomized";
import FooterCustomized from "./components/FooterCustomized";

function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden page-container">
        <AuthProvider>
          <NavCustomized />
          <div style={{paddingBottom:'2.5rem'}}>
          <Switch>
            <PrivateRoute component={MainCustomized} path="/protected" exact />
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={Login} path="/" />
          </Switch>
          </div>
          <FooterCustomized />
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;