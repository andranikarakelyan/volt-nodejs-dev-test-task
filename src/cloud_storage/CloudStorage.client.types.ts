export interface IUploadToCloudArg {
  file: Buffer;
  path: string;
}
export interface IUploadToCloudResult {
  url: string;
}