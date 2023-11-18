import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { S3ImageBlob } from "../interfaces/interfaces";

async function getWH(blob: Blob) {
  const bmp = await createImageBitmap(blob);
  const { width, height } = bmp;
  bmp.close();
  return { width, height }
}

export async function getS3Image(bucket: string, key: string): Promise<S3ImageBlob | null> {
  const client = new S3Client({
    region: "us-west-2",
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: "us-west-2" },
      identityPoolId: "us-west-2:848df77e-ebd9-43dc-93e1-5444f45ecc35",
    }),
  })
  const getObjectCmd = new GetObjectCommand({ Bucket: bucket, Key: key })
  const { Body } = await client.send(getObjectCmd)
  if (Body) {
    const value = await Body.transformToByteArray();
    const blob = new Blob([value]);
    const url = URL.createObjectURL(blob);
    const { width, height } = await getWH(blob)
    return { url, width, height };
  }
  return null
}
