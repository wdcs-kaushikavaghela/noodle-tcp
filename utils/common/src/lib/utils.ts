import { HttpException, HttpStatus } from "@nestjs/common";

export const errorHandler = (code: HttpStatus | number, message: string) => {
  throw new HttpException(message, code);
};
