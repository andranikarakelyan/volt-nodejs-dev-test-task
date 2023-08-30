export interface IUploadToCloudArg {
  file: Buffer | string;
  path: string;
}
export interface IUploadToCloudResult {
  url: string;
}