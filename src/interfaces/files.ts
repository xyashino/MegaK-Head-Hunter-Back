export type MulterMemoryUploadedFile =
  | {
      size: number;
      mimetype: string;
      originalname: string;
      fieldname: string;
      encoding: string;
      buffer: Buffer;
    }
  | undefined;
