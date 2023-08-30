import {IDBChangeCreateArg, IDBChangeCreateResult} from "./Changes.db.api.types";
import {ChangeModel} from "../models/Change.model";

export class ChangesDbApi {
  public static async create(arg: IDBChangeCreateArg): Promise<IDBChangeCreateResult> {

    const change = await ChangeModel.create({
      table_name: arg.table_name,
      table_id: arg.table_id,
      data: arg.data,
      action: arg.action,
      changed_at: new Date(),
    });

    return {};
  }
}