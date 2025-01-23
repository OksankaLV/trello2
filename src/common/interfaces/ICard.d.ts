interface ICard {
  setLists: React.Dispatch<React.SetStateAction<>>;
  id?: number;
  title: string;
  description?: string;
  color?: string;
  custom?: any;
  users?: ID[];
  created_at?: timestamp;
  view: boolean;
  board_id?: string;
  list_id: number;
}

export = ICard;
