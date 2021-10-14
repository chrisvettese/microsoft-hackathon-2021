import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import About from "./About";
import Setup from "./Setup";
import Leaderboard from "./Leaderboard";
import MenuBar from "./MenuBar";


export default function App() {
  const isAuth: boolean = useIsAuthenticated();
  const {accounts} = useMsal();
  const account = accounts[0];

  const signedIn = isAuth && account;

  return (
      <BrowserRouter>
        {
          signedIn && <MenuBar/>
        }
        <Switch>
          <Route path="/about" component={About}/>
          <Route path="/setup" component={Setup}/>
          <Route path="/leaderboard" component={Leaderboard}/>
          <Route path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
  );
}
