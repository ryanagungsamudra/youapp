import axios from "axios";
// ENV url
const url = process.env.NEXT_PUBLIC_API;

export const postLogin = async (body) => {
  return await axios.post(`${url}/api/login`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
