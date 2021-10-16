import {SERVER_PATH} from "../Util";

export type User = {}

/**
 * Returns true if successful, but user is new. Returns user data if user is old.
 * Returns false if error
 */
export async function initializeUser(accessToken: string, oid: string, email: string): Promise<boolean | User> {
  let result = await fetch(`${SERVER_PATH}/user/${oid}`, {
    headers: {
      'Accept': 'application/json',
      'Authentication': accessToken,
      'Content-Type': 'application/json'
    }
  });
  if (result.status === 200) {
    const json = await result.json();
    if (json.username) {
      return json;
    }
    //User has previously signed up but not completed registration
    return true;
  } else {
    result = await createUser(accessToken, oid, email);
    if (result.status === 201) {
      return true;
    }
  }
  return false;
}

async function createUser(accessToken: string, oid: string, email: string) {
  return await fetch(`${SERVER_PATH}/user`, {
    headers: {
      'Accept': 'application/json',
      'Authentication': accessToken,
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      email_address: email,
      oid: oid
    })
  });
}