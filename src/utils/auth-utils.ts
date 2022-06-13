import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function loginGitHub(code: string) {
  const headers = { headers: { Accept: "application/json" } };

  /*   const params = new URLSearchParams({
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET,
    code: code,
  }); */

  /*   const URL_CONSTRUCTOR =
    "https://github.com/login/oauth/access_token?" + params.toString();
  const promise = await axios.post(URL_CONSTRUCTOR, null, headers); */

  return {
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET,
    code: code,
  };
}

export async function getUserDataGitHub(token: string, tokenType: string) {
  const headers = { headers: { Authorization: `${tokenType} ${token}` } };

  const URL_CONSTRUCTOR = "https://api.github.com/user";
  const promise = await axios.get(URL_CONSTRUCTOR, headers);

  return promise.data;
}
