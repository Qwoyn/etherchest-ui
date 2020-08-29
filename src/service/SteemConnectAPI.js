import steemconnect from "steemconnect";

const api = new steemconnect.Client({
  app: "loginking",
  baseURL: "https://steemconnect.com",
  callbackURL:
    process.env.REACT_APP_SC_CALLBACK || "https://steem.hashkings.app/callback",
  scope: ["custom_json", "login"]
});

export default api;
