import {S3Client} from "@aws-sdk/client-s3";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {IUploadToCloudArg, IUploadToCloudResult} from "./CloudStorage.client.types";
import {AppConfig} from "../config";


export class CloudStorageClient {

  private static _s3client: S3Client;

  public static async connect() {
    this._s3client = new S3Client({region: AppConfig.aws.region,});
  }

  public static async upload(arg: IUploadToCloudArg): Promise<IUploadToCloudResult> {
    const data = await this._s3client.send(new PutObjectCommand({
      Bucket: AppConfig.aws.bucket,
      Key: arg.path,
      Body: arg.file
    }));

    return {
      url: `https://${AppConfig.aws.bucket}.s3.${AppConfig.aws.region}.amazonaws.com/${arg.path}`,
    };

  }

}