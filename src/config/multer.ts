import aws from "aws-sdk";
import { randomBytes } from "crypto";
import { diskStorage, Options } from "multer";
import multerS3 from "multer-s3";
import { resolve } from "path";

const storageTypes = {
  local: diskStorage({
    destination: (request, file, callback) => {
      callback(null, resolve(__dirname, '..', '..', 'temp', 'avatar'))
    },
    filename: (request, file, callback) => {
      const hash = randomBytes(16).toString('hex');
      const filename = `${hash}-${file.originalname}`;

      return callback(null, filename);
    }
  }),
  s3: multerS3({
    s3: new aws.S3({
      accessKeyId: "AKIAS3K7HNHSET7MHRE7",
      secretAccessKey: "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",
      region: "us-east-1"
    }),
    bucket: 'tskr-henri87',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request, file, callback) => {
      const hash = randomBytes(16).toString('hex');
      const filename = `${hash}-${file.originalname}`;

      return callback(null, filename);
    }
  })
}

export const multerConfig = {
  dest: resolve(__dirname, '..', '..', 'temp', 'avatar'),
  storage: storageTypes["s3"],
  limits: {
    fileSize: 2 * 1024 * 1024, // 4MB
  },
  fileFilter: (request, file, callback) => {
    const formats = [
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];

    if (!formats.includes(file.mimetype)) {
      callback(new Error("Invalid Format"))
    }
    
    callback(null, true);
  }
} as Options;