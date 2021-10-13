import { AccountInfo } from "@azure/msal-common";
import React from "react";
import AzureAuthenticationButton from "../azure/AzureAuthenticationButton";

export default function SignIn(props: { currentUser: AccountInfo | undefined, onAuthenticated: (userAccountInfo: AccountInfo) => Promise<void> }) {
    const { onAuthenticated, currentUser } = props;

    // Render JSON data in readable format
    const PrettyPrintJson = ({ data }: any) => {
        return (
            <div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        );
    };

    const ShowPermissionRevokeLinks = () => {
        return (
          <div>
            <div><a href="https://myapps.microsoft.com" target="_blank" rel="noopener">Revoke AAD permission</a></div>
            <div><a href="https://account.live.com/consent/manage" target="_blank" rel="noopener">Revoke Consumer permission</a></div>
          </div>
        );
      };

    return (
        <>
            <div id="App">
                <h2>Microsoft Login Button application</h2>
                <AzureAuthenticationButton onAuthenticated={onAuthenticated} />
                {currentUser && (
                    <div>
                        <PrettyPrintJson data={currentUser} />
                        <ShowPermissionRevokeLinks />
                    </div>
                )}
            </div>
        </>
    );
}
