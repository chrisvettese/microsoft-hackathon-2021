import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from "@mui/material";
import Home from "./Home";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
      <Switch>
        <Route path="/sign-in">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
