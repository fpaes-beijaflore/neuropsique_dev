import AWS from 'aws-sdk';
import fs from 'fs';

export const uploadFile = async (fileName, filePath, mimeType) => {
  const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: fileContent,
  };

  const data = await s3.upload(params).promise();
  return data.Location;
};

export const listObjects = async (filter) => {
  const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Prefix: decodeURIComponent(filter),
  };

  const result = await s3.listObjectsV2(params).promise();
  return result.Contents.map((item) => item.Key);
};
