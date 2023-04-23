import * as path from 'path';
import { diskStorage } from 'multer';
import * as mime from 'mime';
import { HttpException, HttpStatus } from '@nestjs/common';

export function storageDir() {
  return path.join(__dirname, '../../uploads');
}

export function multerStorage(dest: string) {
  return diskStorage({
    destination: (req, file, cb) => cb(null, dest),
    filename: (req, file, cb) => {
      const ext = file.originalname.substring(
        file.originalname.lastIndexOf('.') + 1,
      );

      if (ext.toLowerCase() === 'csv') {
        cb(null, `students-import.${mime.getExtension(file.mimetype)}`);
      } else {
        cb(
          new HttpException(
            'Invalid file type',
            HttpStatus.UNSUPPORTED_MEDIA_TYPE,
          ),
          null,
        );
      }
    },
  });
}
