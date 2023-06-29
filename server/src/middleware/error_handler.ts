import {NextFunction, Request, Response} from "express";
import ApiResponse from "../utils/response";
import {getLogger} from "../utils/logger";

let logger = getLogger('error_handler');

function error_handler(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(`[${req.method}][${req.path}]:${err.message} [body]:${JSON.stringify(req.body)} [query]:${JSON.stringify(req.query)}`);
  logger.error(err.stack);
  if (res.headersSent) {
    res.write(`\n\n${ApiResponse.server_error()}\n\n`);
  } else {
    res.json(ApiResponse.server_error());
  }
  next(err);
}

export default error_handler;
