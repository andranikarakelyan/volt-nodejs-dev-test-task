export interface IDBChangeCreateArg {
  table_name: string;
  table_id: number;
  data: any;
  action: 'insert' | 'delete';
}

export interface IDBChangeCreateResult {}