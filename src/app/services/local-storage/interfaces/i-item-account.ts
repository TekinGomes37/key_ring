export interface IItemAccount {
  password: string;
  updatedAt?: Date;
  service: string,
  createdAt: Date;
  mail: string;
  id: string;
}

export interface IItemAccountNew {
  updatedAt?: Date;
  password: string;
  createdAt: Date;
  service: string;
  mail: string;
  id: string;
}

