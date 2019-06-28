
const API_URL = "https://api.foursquare.com/v2";
const CLIENT_ID = "2PX1PZCMAPLOO4TEGJRJ4MZH4TNS3VTHB0EKRQOMK5CYNXCZ";
const CLIENT_SECRET = "PFRBFJ2OEKG4ANCKZIUXLQBLFSBMLYFNCQTLPM23DFCUG5KH";
const VAL_DATE = "20190630";

/*
https://api.foursquare.com/v2/search/recommendations?locale=pt&explicit-lang=true&v=20190625&m=foursquare&query=Alimenta%C3%A7%C3%A3o&limit=30&sw=-15.8600494120678%2C-48.05544376373291&ne=-15.816286122644865%2C-47.998108863830566&wsid=G5NZ5S23ZFGCVDPZBGOR0X0B2Y43LI&oauth_token=0JBXZ5B0MBVZ45KLBMPABQWBNOYEVND5R12EAIAGBNHUF2R0
*/

//https://api.foursquare.com/v2/venues/explore?ll=-15.816286,-47.998109&q=Diversão&radius=300

//https://pt.foursquare.com/explore?mode=share&ne=-15.828755%2C-47.998281&sw=-15.872516%2C-48.055615&vne=-15.816782%2C-48.000941&vsw=-15.860545%2C-48.058276&share=1&rid=5d13b736e97dfb002c5163e8

const headers = {
  'Accept': 'application/json'
};


export const get = (VENUE_ID) =>
  fetch(`${API_URL}/venues/${VENUE_ID}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VAL_DATE}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getAll = () =>
  fetch(`${API_URL}/venues/search?near=Aguas%20Claras%20Brasília&radius=300&limit=2&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VAL_DATE}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const search = (QUERY) =>
  fetch(`${API_URL}/venues/search?ll=-15.816286,-47.998109&q=${QUERY}&radius=300&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VAL_DATE}`, { headers })
    .then(res => res.json())
    .then(data => data)
