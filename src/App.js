import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Vehicles from "./components/vehicles/vehicles";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import VehicleForm from "./components/vehicles/vehiclesForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/vehicles/:id" component={VehicleForm} />
            <Route path="/vehicles" component={Vehicles} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/vehicles" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
