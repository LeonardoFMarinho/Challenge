import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";

import "./shared/container";
import "express-async-errors";
import { router } from "./routes";

import "./database";
import { AppError } from "./shared/error/app.error";

const app = express();
app.use(express.json());
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message} `,
    });
  }
);

export { app };
