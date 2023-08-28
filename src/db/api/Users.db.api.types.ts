export interface IGetByEmailPasswordArg {
  email: string;
  password: string;
}
export interface IGetByEmailPasswordResult {
  id: number;
  email: string;
  nickname: string;
}