import {IGetByEmailPasswordArg, IGetByEmailPasswordResult} from "./Users.db.api.types";
import {UserModel} from "../models/User.model";
import {AppError} from "../../utils/AppError";
import {ErrorCode} from "../../utils/ErrorCode";

export class UsersDbApi {
  public static async getByEmailPassword(arg: IGetByEmailPasswordArg): Promise<IGetByEmailPasswordResult> {

    const user = await UserModel.findOne({
      raw: true,
      where: {
        email: arg.email,
        password: arg.password
      },
    });

    if (!user) {
      throw new AppError(ErrorCode.NOT_FOUND, 'User not found');
    }

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };

  }
}