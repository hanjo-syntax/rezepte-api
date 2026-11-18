import { Request, Response, NextFunction } from "express";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  const name = err instanceof Error ? err.name : "UnknownError";
  const message =
    err instanceof Error
      ? err.message
      : typeof err === "object" && err !== null && "message" in err && typeof err.message === "string"
        ? err.message
        : String(err);
  const status =
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    typeof err.status === "number" &&
    Number.isInteger(err.status) &&
    err.status >= 400 &&
    err.status <= 599
      ? err.status
      : 500;

  console.error(`${name}: ${message}`);

  if (res.headersSent) {
    next(err);
    return;
  }

  res.status(status).json({ fehler: message });
}
