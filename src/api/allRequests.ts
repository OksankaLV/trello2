import axios from "axios";
import api from "../common/constants/api";
import { toast } from "react-toastify";
import {
  removeItemTokenStorage,
  setTokenToLocalStorage,
  useAuth,
} from "../hooks/use-auth";
import { postToken } from "./reguestsUser";

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const { token } = useAuth();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("ПОМИ req" + error);
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log("ПОМИЛКА!!!!!!!!" + error);
    if (error.response.status === 401) {
      refreshTokenFunc(error);
      error.config.headers.Authorization = `Bearer ${useAuth().token}`;
      return instance.request(error.config);
    } else {
      toast.warn("Повторіть спробу");
      return error;
    }
  }
);

const refreshTokenFunc = async (e: any) => {
  console.log("refreshTOKEN");
  const refreshToken = useAuth().refreshToken;
  if (e.response.request.status === 401 && refreshToken) {
    try {
      const dataRefreshTokens = await postToken(refreshToken);
      setTokenToLocalStorage(dataRefreshTokens);
      console.log("Оновлюємо токен");
    } catch (err: any) {
      console.log("Delete token");
      removeItemTokenStorage();
      toast.error("Час сесії вийшов, зареєструйтеся будь ласка повторно");
    }
  } else {
    removeItemTokenStorage();
    location.reload();
  }
};

export const getBoards = async () => {
  const { data } = await instance.get(`${api.baseURL}/board`, {});
  return data.boards;
};

export const postBoard = async (value: string, custom?: object) => {
  const { data } = await instance.post(`${api.baseURL}/board`, {
    title: value,
    custom: custom,
  });
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
  const { data } = await instance.put(`${api.baseURL}/board/${board_id}`, {
    title: title,
    custom: custom,
  });
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
  const { data } = await instance.put(`${api.baseURL}/board/${board_id}/list`, [
    {
      id: id,
      title: title,
      position: position,
    },
  ]);
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
  const { data } = await instance.put(`${api.baseURL}/board/${board_id}/card`, [
    { id: id, position: position, list_id: list_id },
  ]);
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
