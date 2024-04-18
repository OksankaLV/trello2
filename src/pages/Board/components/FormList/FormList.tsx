import './formList.scss';
import React, { useState } from 'react';
import { postList } from '../../../../utils/allRequests';
import { validation } from '../../../../utils/validationText';

interface IForm {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string | undefined;
}

function addList(titleList: string, id: string | undefined) {
  if (validation(titleList)) {
    postList(id, titleList, 1).then((req) => alert(`Лист з ID = ${req.id} успішно дадано`));
  } else {
    alert(
      "ім'я не повинно бути порожнім, у ньому можна використовувати цифри, літери (а, А), пробіли, тире, крапки, нижні підкреслення"
    );
  }
}

export const FormList = ({ active, setActive, id }: IForm) : JSX.Element => {
  const [titleList, setTitleList] = useState('Введіть назву дошки');

  return (
    <form className={active ? 'newList' : 'noneList'}>
      <div className="formList">
        {' '}
        <input type="text" value={titleList} onChange={(event) => setTitleList(event?.target.value)} />
        <button
          type="submit"
          onClick={() => {
            addList(titleList, id);
          }}
        >
          Додати картку
        </button>
      </div>
    </form>
  );
};
