import { Request, Response, NextFunction } from "express";


const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("🔥 Error caught by middleware:", err);

  let statusCode = err.statusCode || 500;
  let messageEn = err.message || "Server Error";
  let messageAr = err.messageAr || "حدث خطأ في الخادم";

  // Handle invalid ObjectId (CastError)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    messageEn = "Resource not found";
    messageAr = "المصدر غير موجود";
  }

  // Handle duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    messageEn = `Duplicate value for field: ${field}`;
    messageAr = `قيمة مكررة في الحقل: ${field}`;
    statusCode = 400;
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors || {}).map((val: any) => val.message);
    messageEn = `Validation failed: ${errors.join(", ")}`;
    messageAr = `فشل التحقق: ${errors.join("، ")}`;
    statusCode = 400;
  }

  // JWT expired
  if (err.name === "TokenExpiredError") {
    messageEn = "Session expired, please log in again";
    messageAr = "انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى";
    statusCode = 401;
  }


  res.status(statusCode).json({
    success: false,
    message: {
      en: messageEn,
      ar: messageAr,
    },
  });
};

export default errorMiddleware;
