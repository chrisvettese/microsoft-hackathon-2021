import {SERVER_PATH} from "../Util";

export default async function getTransitMethods(accessToken: string) {
  return await fetch(`${SERVER_PATH}/transit/methods`, {
    headers: {
      'Accept': 'application/json',
      'Authentication': accessToken,
      'Content-Type': 'application/json'
    }
  });
}