import {NextFunction, Request, Response} from "express";

async function res_handler(req: Request, res: Response, next: NextFunction) : Promise<void> {
  const oldJson = res.json;

  // @ts-ignore
  res.json = function (data) {
    const jsonString = JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );

    oldJson.call(this, JSON.parse(jsonString));
  }

  next();
}

export default res_handler;
