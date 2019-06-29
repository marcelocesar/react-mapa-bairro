
const API_URL = "https://api.foursquare.com/v2";
const CLIENT_ID = "2PX1PZCMAPLOO4TEGJRJ4MZH4TNS3VTHB0EKRQOMK5CYNXCZ";
const CLIENT_SECRET = "PFRBFJ2OEKG4ANCKZIUXLQBLFSBMLYFNCQTLPM23DFCUG5KH";
const VAL_DATE = "20190630";

const headers = {
  'Accept': 'application/json'
};


export const get = (VENUE_ID) =>
  fetch(`${API_URL}/venues/${VENUE_ID}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VAL_DATE}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getAll = () =>
  fetch(`${API_URL}/venues/explore?ll=-15.837565,-48.029998&radius=200&limit=10&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VAL_DATE}`, { headers })
    .then(res => res.json())
    .then(data => data)

