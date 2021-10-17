import {SERVER_PATH} from "../Util";

export default async function getTransitMethods(accessToken: string) {
  const result = await fetch(`${SERVER_PATH}/transit/methods`, {
    headers: {
      'Accept': 'application/json',
      'Authentication': accessToken,
      'Content-Type': 'application/json'
    }
  });
  if (result.status === 200) {
    return await result.json();
  }
  return result;
}