import { HttpException, HttpStatus } from '@nestjs/common';

export const fileLimits = {
  fileSize: 1024 * 1024 * 10,
};

export const fileFilter = (_, file, cb) => {
  const ext = file.originalname.substring(
    file.originalname.lastIndexOf('.') + 1,
  );

  if (ext.toLowerCase() === 'csv') {
    cb(null, true);
  } else {
    cb(
      new HttpException('Invalid file type', HttpStatus.UNSUPPORTED_MEDIA_TYPE),
      false,
    );
  }
};

const requiredColumns = [
  'email',
  'courseCompletion',
  'courseEngagement',
  'projectDegree',
  'teamProjectDegree',
  'bonusProjectUrls',
];

export const validateRequiredColumns = (results) => {
  const missingColumns = requiredColumns.filter(
    (column) => !results.meta.fields.includes(column),
  );
  if (missingColumns.length > 0) {
    throw new HttpException(
      'Columns are missing in the imported file',
      HttpStatus.BAD_REQUEST,
    );
  }
  return results;
};
