export default class AppError extends Error {
  statusCode: number;
  messageAr: string;
  isOperational: boolean;

  constructor(messageEn: string, messageAr: string, statusCode: number) {
    super(messageEn);
    this.statusCode = statusCode;
    this.messageAr = messageAr;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
