import axios from "axios";
import api from "../common/constants/api";


//creating a user/regisration
export const postUser = async (email: string, pass: string) => {
    return await axios.post(`${api.baseURL}/user`, {
        email: email,
        password: pass,
      }); //201 Created {result: Created, id: 1213332}
  };
  
  //user search by username
  export const getUser = async (email: string) => {
    const username = email.split("@")[0];
    const data = await axios.get(`${api.baseURL}/user`, {
      params: {
        emailOrUsername: username,
      },
    });
    return data; //200 Ok [{id:1, username: 'cwe'}, {id: 23, username: 'cwemmmm'}]
  };
  
  // authorization
  export const postLogin = async (email: string, pass: string) => {
    return await axios.post(`${api.baseURL}/login`, {
        email: email,
        password: pass,
      }); //200 Ok {result: "Authorized", token: "jhgfdredfyu", refreshToken: "gfdrtyuih"}
  };
  
  // refresh token authorized
  export const postToken = async (refreshToken: string) => {
    return await axios.post(`${api.baseURL}/refresh`, {
        refreshToken: refreshToken,
      }); //200 Ok {result: "Authorized", token: "jhgfdredfyu", refreshToken: "gfdrtyuih"}
  };