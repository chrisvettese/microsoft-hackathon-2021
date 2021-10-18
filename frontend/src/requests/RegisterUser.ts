import {Transit, Type} from "../TransitForm";
import {ServerProvince} from "./GetProvinces";
import {SERVER_PATH} from "../Util";
import {ServerTransitMethod} from "./GetTransitMethods";

interface ServerTransit {
  oid: string;
  transit_id: number;
  frequency: {
    value: number;
    per: string;
  };
  distance: number,
  type: Type
}

export default async function registerUser(oid: string, username: string, province: string, transitForms: Transit[], provinces: ServerProvince[], accessToken: string) {
  const transits: ServerTransit[] = [];

  transitForms.forEach((form) => {
    transits.push({
      oid: oid,
      transit_id: (form.transitMethod as ServerTransitMethod).id,
      frequency: {
        value: form.frequency as number,
        per: form.frequencyUnit,
      },
      distance: form.distance as number,
      type: form.type
    });
  })

  const [result1, result2] = await Promise.all([fetch(`${SERVER_PATH}/user`, {
    headers: {
      'Accept': 'application/json',
      'Authentication': accessToken,
      'Content-Type': 'application/json'
    },
    method: "PATCH",
    body: JSON.stringify({
      oid: oid,
      username: username,
      province: parseInt(province)
    })
  }),
    fetch(`${SERVER_PATH}/transit`, {
      headers: {
        'Accept': 'application/json',
        'Authentication': accessToken,
        'Content-Type': 'application/json'
      },
      method: "PATCH",
      body: JSON.stringify({
        oid: oid,
        transits: transits
      })
    })
  ]);

}