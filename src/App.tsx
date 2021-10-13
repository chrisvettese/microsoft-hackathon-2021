import { AccountInfo } from "@azure/msal-browser";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import SignIn from "./pages/SignIn";
import { useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./azure/azure-auth-config";


export default function App() {
  const msalInstance = new PublicClientApplication(msalConfig);
  

  return (
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
        <Switch>
          <Route path="/sign-in" component={SignIn}>
          </Route>
        </Switch>
      </BrowserRouter>
    </MsalProvider>
  );
}
