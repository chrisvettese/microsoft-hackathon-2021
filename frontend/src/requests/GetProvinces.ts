import {SERVER_PATH} from "../Util";

export interface ServerProvince {
  id: number;
  name: string;
  emissions_per_watt: number;
}

export default async function getProvinces(accessToken: string): Promise<ServerProvince[]> {
  const result = await fetch(`${SERVER_PATH}/user/provinces`, {
    headers: {
      'Accept': 'application/json',
      'Authentication': accessToken,
      'Content-Type': 'application/json'
    }
  });
  if (result.status === 200) {
    return await result.json();
  }
  return [];
}