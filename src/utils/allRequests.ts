import axios from "axios";
import api from "../common/constants/api";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const token = 123;
const header = { Authorization: `Bearer ${token}` };

let progressValue = 0;

export function req(setProgressValue: Dispatch<SetStateAction<number>>) {
  let progress: NodeJS.Timer;
  axios.interceptors.request.use(
    function (option) {
      setProgressValue(progressValue);
      progressValue < 95
        ? (progressValue = progressValue + 5)
        : (progressValue = progressValue - 5);
      progress = setInterval(() => setProgressValue(progressValue), 100);
      return option;
    },
    function (error) {
      toast.warn(error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (option) {
      clearInterval(progress);
      progressValue = 90;
      setProgressValue((progressValue = progressValue + 10));
      return option;
    },
    function (error) {
      toast.warn(error);
      return Promise.reject(error);
    }
  );
}

export const getBoards = async (
  setProgressValue: Dispatch<SetStateAction<number>>
) => {
  const { data } = await axios.get(`${api.baseURL}/board`, {
    headers: header,
    onDownloadProgress: () => {
      setProgressValue(100);
    },
  });
  return data.boards;
};

export const postBoard = async (value: string, custom?: object) => {
  const { data } = await axios.post(
    `${api.baseURL}/board`,
    {
      title: value,
      custom: custom,
    },
    {
      headers: header,
    }
  );
  return data;
};

export const getBoard = async (board_id: string | undefined) => {
  const { data } = await axios.get(`${api.baseURL}/board/${board_id}`, {
    headers: header,
    onDownloadProgress: () => {
      progressValue = 100;
    },
  });

  return data;
};

export const putBoard = async (
  board_id: string | undefined,
  title: string,
  custom?: object
) => {
  const { data } = await axios.put(
    `${api.baseURL}/board/${board_id}`,
    { title: title, custom: custom },
    { headers: header }
  );
  return data;
};

export const deleteBoard = async (board_id: string | undefined) => {
  const { data } = await axios.delete(`${api.baseURL}/board/${board_id}`, {
    headers: header,
  });

  return data;
};

export const postList = async (
  board_id: string | undefined,
  title: string,
  position?: number
) => {
  console.log(title, position);
  const { data } = await axios.post(
    `${api.baseURL}/board/${board_id}/list`,
    {
      title: title,
      position: position,
    },
    {
      headers: header,
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
  const { data } = await axios.put(
    `${api.baseURL}/board/${board_id}/list`,
    [
      {
        id: id,
        title: title,
        position: position,
      },
    ],
    {
      headers: header,
    }
  );
  return data;
};

export const putList = async (
  board_id: string | undefined,
  title: string,
  list_id: number,
  position: number
) => {
  console.log(`${api.baseURL}/board/${board_id}/list/${list_id}`);
  const { data } = await axios.put(
    `${api.baseURL}/board/${board_id}/list/${list_id}`,
    {
      id: list_id,
      title: title,
      position: position,
    },
    {
      headers: header,
    }
  );
  return data;
};

export const deleteList = async (board_id: string | undefined, id: number) => {
  const { data } = await axios.delete(
    `${api.baseURL}/board/${board_id}/list/${id}`,
    {
      headers: header,
    }
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
  const { data } = await axios.post(
    `${api.baseURL}/board/${board_id}/card`,
    {
      title: value,
      list_id: list_id,
      position: position,
      description: description,
      custom: custom,
    },
    {
      headers: header,
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
  const { data } = await axios.put(
    `${api.baseURL}/board/${board_id}/card`,
    [{ id: id, position: position, list_id: list_id }],
    {
      headers: header,
    }
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
  const { data } = await axios.put(
    `${api.baseURL}/board/${board_id}/card/${id}`,
    {
      title: title,
      description: description,
      list_id: list_id,
    },
    {
      headers: header,
    }
  );
  return data;
};

export const deleteCard = async (
  board_id: string | undefined,
  id: number | string | undefined
) => {
  const { data } = await axios.delete(
    `${api.baseURL}/board/${board_id}/card/${id}`,
    {
      headers: header,
    }
  );
  return data;
};
