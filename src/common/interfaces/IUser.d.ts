interface IUser {
  id: number; //auto_increment from 1 to infinity
  email: string;
  username: string; //email.split("@")[0]
}
