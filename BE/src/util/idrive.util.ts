import * as AWS from 'aws-sdk';
import { IDRIVE_CONFIG } from 'src/config/idrive.config';

let s3Client: AWS.S3; // 싱글톤으로 유지할 S3 클라이언트

export const getIdriveS3Client = (): AWS.S3 => {
  if (!s3Client) {
    s3Client = new AWS.S3(IDRIVE_CONFIG);
  }
  return s3Client;
};

export const createObjectParamsForPreSign = (
  bucketName: string,
  key: string,
) => ({
  Bucket: bucketName,
  Key: key,
  Expires: 100, // 100초 동안만 url 유지
});
