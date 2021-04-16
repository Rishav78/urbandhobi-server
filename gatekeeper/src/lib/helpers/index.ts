import { HttpException } from '@nestjs/common';

export const handleMSError = (error: any) => {
  if (!error) {
    return new HttpException('error occur on server', 500);
  }
  const {
    error: { message, httpCode },
  } = error;

  return new HttpException(message, httpCode);
};
