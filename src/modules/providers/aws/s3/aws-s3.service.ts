/* eslint-disable @typescript-eslint/prefer-promise-reject-errors,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import {
  CompleteMultipartUploadCommandOutput,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Options, Upload } from '@aws-sdk/lib-storage';
import { config } from '@/config/config.service';
import { uniqueFileName } from '@/base/util/multer.helper';
import axios from 'axios';

export class AwsS3Service {
  private readonly s3Client: S3Client;

  constructor(
    private readonly accessKeyId: string,
    private readonly secretAccessKey: string,
    private readonly bucket: string,
    private readonly region: string,
  ) {
    this.s3Client = this.getS3();
  }

  getS3() {
    return new S3Client({
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
      region: this.region,
      forcePathStyle: true,
    });
  }

  uploadBuffer(buffer: Buffer, mimetype: string, bucket: string, key: string) {
    const params: Options = {
      client: this.s3Client,
      params: {
        Body: buffer,
        ACL: 'public-read',
        Bucket: bucket ?? this.bucket,
        Key: String(key),
        ContentType: mimetype,
      },
    };

    const upload: Upload = new Upload(params);
    return new Promise((resolve, reject) => {
      upload
        .done()
        .then((data: CompleteMultipartUploadCommandOutput) => {
          resolve(data);
        })
        .catch((err: { message: string }) => {
          reject(err.message);
        });
    });
  }

  async uploadByMulter(
    file: Express.Multer.File,
    folders: (string | number)[],
    bucket?: string,
  ) {
    const { originalname } = file;
    const fileName = uniqueFileName(originalname);
    const filePath = folders
      ? [...folders.map((o) => o.toString().trim()), fileName].join('/')
      : fileName;
    const uploadResult = await this.uploadBuffer(
      file.buffer,
      file.mimetype,
      bucket ?? this.bucket,
      filePath,
    );

    return {
      filePath,
      uploadResult,
      uploadFile: {
        ...file,
        path: uploadResult['Location'],
        buffer: undefined,
      },
    };
  }

  async uploadFromUrl(
    fileUrl: string,
    folders?: (string | number)[],
    bucket?: string,
  ) {
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const path: string = response.request.path;
    const key = [
      ...folders.map((o) => o.toString().trim()),
      path.match(/[^/]+$/)[0],
    ].join('/');
    const mimetype: string =
      response.headers['content-type'] || 'application/octet-stream';
    return this.uploadBuffer(buffer, mimetype, bucket ?? this.bucket, key);
  }

  async deleteFile(remoteFile: string, bucket?: string) {
    const key = /http/.test(remoteFile)
      ? remoteFile.trim().split('/').slice(4).join('/')
      : remoteFile;

    const command: DeleteObjectCommandInput = {
      Key: key,
      Bucket: bucket ?? this.bucket,
    };

    return new Promise((resolve, reject) => {
      this.s3Client
        .send(new DeleteObjectCommand(command))
        .then((data: DeleteObjectCommandOutput) => {
          resolve(data);
        })
        .catch((error: { message: string }) => {
          reject(error.message);
        });
    });
  }
}

@Injectable()
export class CommonAwsS3Service extends AwsS3Service {
  constructor() {
    super(
      config.S3.S3_ACCESS_KEY_ID,
      config.S3.S3_SECRET_ACCESS_KEY,
      config.S3.S3_BUCKET,
      config.S3.S3_REGION,
    );
  }
}
