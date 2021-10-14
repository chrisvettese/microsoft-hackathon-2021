import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import {PublicClientApplication} from "@azure/msal-browser";
import {MsalProvider} from "@azure/msal-react";
import {msalConfig} from "./azure/azure-auth-config";


export default function App() {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <Switch>
          <Route path="/welcome" component={Home}/>
          <Route path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    </MsalProvider>
  );
}
