interface IList {
  board_id?: string | undefined;
  setLists: React.Dispatch<React.SetStateAction<>>;
  id: number;
  titleList: string;
  //  setTitle: React.Dispatch<React.SetStateAction<>>;
  cards: ICard[];
  position: number;
}

export = IList;
