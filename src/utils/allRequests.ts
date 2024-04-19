import axios from 'axios';
import api from '../common/constants/api';
import { Dispatch, SetStateAction } from 'react';
import { Bounce, toast } from 'react-toastify';

const token = 123;
const header = { Authorization: `Bearer ${token}` };

let progressValue = 0;


export function req(setProgressValue: Dispatch<SetStateAction<number>>, setError: Dispatch<SetStateAction<string>>) {
  let progress: any;
  axios.interceptors.request.use(
    function (option) {
      setProgressValue(progressValue);
      (progressValue<95) ? progressValue = progressValue+5: progressValue=progressValue-5;
      progress = setInterval(() => setProgressValue(progressValue), 100);
      console.log('req');
      return option;
    },
    function (error) {
      console.log(error);
     // setError(error);
      toast.warn(error, {
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
        closeOnClick: true,
      });
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (option) {
      console.log('response');
      clearInterval(progress);
      progressValue=90;
      setProgressValue((progressValue = progressValue + 10));
      return option;
    },
    function (error) {
      console.log(error);
      //setError(error);
      toast.warn(error, {
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
        closeOnClick: true,
      });
      return Promise.reject(error);
    }
  );
}

export const getBoards = async (setProgressValue: Dispatch<SetStateAction<number>>) => {
  console.log(`${api.baseURL}`);
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
  console.log(data)
  return data;
};

export const getBoard = async (board_id: string | undefined) => {
  const { data } = await axios.get(`${api.baseURL}/board/${board_id}`, {
    headers: header,
    onDownloadProgress: () => {
      console.log("getBoard")
      progressValue = 100;
    },
  });

  return data;
};

export const putBoard = async (board_id: string | undefined, title: string, custom?: object) => {
  const { data } = await axios.put(
    `${api.baseURL}/board/${board_id}`,
    { title: title, custom: custom },
    { headers: header }
  );
  return data;
};

export const deleteBoard = async (board_id: string | undefined) => {
  const { data } = await axios.delete(`${api.baseURL}/board/${board_id}`, { headers: header });

  return data;
};

export const postList = async (board_id: string | undefined, title: string, position?: number) => {
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

export const putLists = async (board_id: string | undefined, id: number, position: number) => {
  const { data } = await axios.put(
    `${api.baseURL}/board/${board_id}/list`,
    [
      {
        id: id,
        position: position,
      },
    ],
    {
      headers: header,
    }
  );
  return data;
};

export const putList = async (board_id: string | undefined, id: number, position: number) => {
  const { data } = await axios.put(
    `${api.baseURL}/board/${board_id}/list/${id}`,
    {
      position: position,
    },
    {
      headers: header,
    }
  );
  return data;
};

export const deleteList = async (board_id: string | undefined, id: number) => {
  const { data } = await axios.delete(`${api.baseURL}/board/${board_id}/list/${id}`, {
    headers: header,
  });
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

export const putCards = async (board_id: string | undefined) => {
  const { data } = await axios.put(
    `${api.baseURL}/board/${board_id}/card`,
    [{ id: Number, position: Number, list_id: Number }],
    {
      headers: header,
    }
  );
  return data;
};

export const putCard = async (
  board_id: string | undefined,
  id: number,
  title: string,
  description: string,
  list_id: number
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

export const deleteCard = async (board_id: string | undefined, id: number | undefined) => {
  const { data } = await axios.delete(`${api.baseURL}/board/${board_id}/card/${id}`, {
    headers: header,
  });
  return data;
};
