import './formList.scss';
import React, { useState } from 'react';
import { getBoard, postList } from '../../../../utils/allRequests';
import { validation } from '../../../../utils/validationText';
import { toast } from 'react-toastify';
import { error } from 'console';

interface IForm {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string | undefined;
  position: number;
  setLists: React.Dispatch<React.SetStateAction<object>>;
}

function addList(titleList: string, id: string | undefined, position: number, setLists: any) {
  if (validation(titleList)) {
    postList(id, titleList, position).then((req) => alert(`Лист з ID = ${req.id} успішно дадано`))
    .then(() => getBoard(id)).then((data)=>setLists(data.lists))
    .catch((error)=>toast.warn(error));
  } else {
    alert(
      "ім'я не повинно бути порожнім, у ньому можна використовувати цифри, літери (а, А), пробіли, тире, крапки, нижні підкреслення"
    );
  }
}

export const FormList = ({ active, setActive, id, position, setLists }: IForm) : JSX.Element => {
  const [titleList, setTitleList] = useState('');

  return (
    <form className={active ? 'newList' : 'noneList'}>
      <div className="formList">
        {' '}
        <input type="text" placeholder={'Введіть назву листа'}value={titleList} onChange={(event) => setTitleList(event?.target.value)} />
        <button
          type="submit"
          onClick={() => {
            addList(titleList, id, position, setLists);
            setActive(false)
          }}
        >
          Зберегти лист
        </button>
      </div>
    </form>
  );
};
