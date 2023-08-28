export interface IGetByEmailPasswordArg {
  email: string;
  password: string;
}

export interface IGetByEmailPasswordResult {
  id: number;
  email: string;
  nickname: string;
}

export interface IGetByIdArg {
  id: number
}

export interface IGetByIdResult {
  id: number;
  email: string;
  nickname: string;
}