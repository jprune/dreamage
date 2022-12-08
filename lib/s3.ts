import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomBytes } from 'crypto';

const bucketName = process.env.AWS_BUCKET_NAME as string;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

export async function generateUploadUrl() {
    const imageName = await randomBytes(16).toString('hex');

    const params = {
        Bucket: bucketName,
        Key: imageName,
    };
    const command = new PutObjectCommand(params);
    const seconds = 60;

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: seconds });
    return uploadUrl;
}
  

export async function generateDownloadUrl(imageName: string) {

    const params = {
        Bucket: bucketName,
        Key: imageName,
    };
    const command = new GetObjectCommand(params);
    const seconds = 3600;

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: seconds });
    console.log(uploadUrl);
    return uploadUrl;
}