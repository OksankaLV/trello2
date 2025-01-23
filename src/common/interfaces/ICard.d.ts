interface ICard {
  id?: number;
  title: string;
  description?: string;
  color?: string;
  custom?: any;
  users?: ID[];
  created_at?: timestamp;
}

export = ICard;
