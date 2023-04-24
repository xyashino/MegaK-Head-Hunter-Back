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

export const filteredResults = (results) => {
  const missingColumns = requiredColumns.filter(
    (column) => !results.meta.fields.includes(column),
  );
  if (missingColumns.length > 0) {
    throw new HttpException(
      'Columns are missing in the imported file',
      HttpStatus.BAD_REQUEST,
    );
  }

  const invalidEmails = results.data.filter(
    (item) => !item.email.includes('@'),
  );
  if (invalidEmails.length > 0) {
    throw new HttpException(
      'Invalid email addresses in imported file',
      HttpStatus.BAD_REQUEST,
    );
  }

  const invalidFieldsWhereNumbersRequired = results.data.filter(
    (item) =>
      isNaN(Number(item.courseCompletion)) &&
      isNaN(Number(item.courseEngagement)) &&
      isNaN(Number(item.projectDegree)) &&
      isNaN(Number(item.teamProjectDegree)),
  );

  if (invalidFieldsWhereNumbersRequired.length > 0) {
    throw new HttpException(
      'Not all fields in the imported file where numbers are required contain correct data',
      HttpStatus.BAD_REQUEST,
    );
  }

  const invalidRangeOfNumbers = results.data.filter(
    (item) =>
      Number(item.courseCompletion) > 5 ||
      Number(item.courseCompletion) < 0 ||
      Number(item.courseEngagement) > 5 ||
      Number(item.courseEngagement) < 0 ||
      Number(item.projectDegree) > 5 ||
      Number(item.projectDegree) < 0 ||
      Number(item.teamProjectDegree) > 5 ||
      Number(item.teamProjectDegree) < 0,
  );

  if (invalidRangeOfNumbers.length > 0) {
    throw new HttpException(
      'Not all fields in the imported file contain numbers from 0 to 5, where required',
      HttpStatus.BAD_REQUEST,
    );
  }

  const invalidArrayWithUrls = results.data.filter(
    (item) => !Array.isArray(item.bonusProjectUrls.split(',')),
  );

  if (invalidArrayWithUrls.length > 0) {
    throw new HttpException(
      'The url field is not an array',
      HttpStatus.BAD_REQUEST,
    );
  }

  return results;
};
