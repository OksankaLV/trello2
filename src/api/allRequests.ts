import axios from "axios";
import api from "../common/constants/api";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/use-auth";

const token = localStorage.getItem("tokenStorage");

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

instance.interceptors.request.use(
  function (config) {
    
    if (useAuth().token !== null) {
      console.log("Токен збережений, надсилаю запит");
    return config;
    } else {
      // window.location.assign(`/#login`);
      console.log("Токен відсутній, надсилаю запит");
    }
    return config;
  },
  function (error) {
    console.log("Помилка запиту");
    return error;
  }
);

instance.interceptors.response.use(
  function (config) {
    console.log("Відповідь успішна");
    return config;
  },
  function (error) {
    console.log("Відповідь з помилкою");
    if (error.response.request.status === 401) {
      const refreshToken = useAuth().refreshToken;
      if (refreshToken !== null) {
        postToken(refreshToken)
          .then((data) => {
            console.log(data);
            if (data.status == 200) {
              localStorage.setItem("tokenStorage", data.data.token);
              localStorage.setItem(
                "refreshTokenStorage",
                data.data.refreshToken
              );
            } else {
              console.log("post token error");
            }
          })
          .then(() => (document.location.href = "/"));
      } else {
        window.location.assign(`/login`);
      }
      console.log("перехоплювач 401 аксіос рес помилка");
      toast.warn(error);
    } else toast.warn("Виникла несподівана помилка, спроуйте ще раз");
    console.log("перехоплювач аксіос рес помилка");
    console.log(error);
    return error;
  }
);

export const getBoards = async (
  setProgressValue: Dispatch<SetStateAction<number>>
) => {
  const { data } = await instance.get(`${api.baseURL}/board`, {
    
    onDownloadProgress: () => {
      setProgressValue(100);
    },
  });
  return data.boards;
};

export const postBoard = async (value: string, custom?: object) => {
  const { data } = await instance.post(
    `${api.baseURL}/board`,
    {
      title: value,
      custom: custom,
    }
  );
  return data;
};

export const getBoard = async (board_id: string | undefined) => {
  const { data } = await instance.get(`${api.baseURL}/board/${board_id}`);

  return data;
};

export const putBoard = async (
  board_id: string | undefined,
  title: string,
  custom?: object
) => {
  const { data } = await instance.put(
    `${api.baseURL}/board/${board_id}`,
    { title: title, custom: custom },
    
  );
  return data;
};

export const deleteBoard = async (board_id: string | undefined) => {
  const { data } = await instance.delete(`${api.baseURL}/board/${board_id}`);

  return data;
};

export const postList = async (
  board_id: string | undefined,
  title: string,
  position?: number
) => {
  const { data } = await instance.post(
    `${api.baseURL}/board/${board_id}/list`,
    {
      title: title,
      position: position,
    }
  );
  return data;
};

export const putLists = async (
  board_id: string | undefined,
  title: string,
  id: number,
  position: number
) => {
  const { data } = await instance.put(
    `${api.baseURL}/board/${board_id}/list`,
    [
      {
        id: id,
        title: title,
        position: position,
      },
    ]
  );
  return data;
};

export const putList = async (
  board_id: string | undefined,
  title: string,
  list_id: number,
  position: number
) => {
  const { data } = await instance.put(
    `${api.baseURL}/board/${board_id}/list/${list_id}`,
    {
      id: list_id,
      title: title,
      position: position,
    }
  );
  return data;
};

export const deleteList = async (board_id: string | undefined, id: number) => {
  const { data } = await instance.delete(
    `${api.baseURL}/board/${board_id}/list/${id}`
  );
  return data;
};

export const postCard = async (
  value: string,
  board_id: string | undefined,
  list_id: number | undefined,
  position?: number,
  description?: string,
  custom?: object
) => {
  const { data } = await instance.post(
    `${api.baseURL}/board/${board_id}/card`,
    {
      title: value,
      list_id: list_id,
      position: position,
      description: description,
      custom: custom,
    }
  );
  return data;
};

export const putCards = async (
  board_id: string | undefined | number,
  id: number,
  position: number,
  list_id: number
) => {
  const { data } = await instance.put(
    `${api.baseURL}/board/${board_id}/card`,
    [{ id: id, position: position, list_id: list_id }]
  );
  return data;
};

export const putCard = async (
  board_id: string | undefined,
  id: number | undefined,
  title: string,
  list_id: number,
  description?: string
) => {
  const { data } = await instance.put(
    `${api.baseURL}/board/${board_id}/card/${id}`,
    {
      title: title,
      description: description,
      list_id: list_id,
    }
  );
  return data;
};

export const deleteCard = async (
  board_id: string | undefined,
  id: number | string | undefined
) => {
  const { data } = await instance.delete(
    `${api.baseURL}/board/${board_id}/card/${id}`
  );
  return data;
};

//creating a user/regisration
export const postUser = async (email: string, pass: string) => {
  const data = await axios.post(`${api.baseURL}/user`, {
    email: email,
    password: pass,
  });
  return data; //201 Created {result: Created, id: 1213332}
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
  const data = await axios.post(`${api.baseURL}/login`, {
    email: email,
    password: pass,
  });
  return data; //200 Ok {result: "Authorized", token: "jhgfdredfyu", refreshToken: "gfdrtyuih"}
};

// refresh token authorized
export const postToken = async (refreshToken: string) => {
  const data = await axios.post(`${api.baseURL}/refresh`, {
    refreshToken: refreshToken,
  });
  return data; //200 Ok {result: "Authorized", token: "jhgfdredfyu", refreshToken: "gfdrtyuih"}
};
