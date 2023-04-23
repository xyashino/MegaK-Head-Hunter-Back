export interface MulterMemoryUploadedFiles {
  [fieldname: string]:
    | {
        size: number;
        mimetype: string;
        originalname: string;
        fieldname: string;
        encoding: string;
        buffer: Buffer;
      }[]
    | undefined;
}
