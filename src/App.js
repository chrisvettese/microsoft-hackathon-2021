import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}/>
      </Switch>
      <Switch>
        <Route path="/sign-in">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
