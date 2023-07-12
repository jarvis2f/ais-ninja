declare namespace Express {
  interface Request<P = {}, ResBody = any, ReqBody = any, ReqQuery = qs.ParsedQs, Locals extends Record<string, any> = Record<string, any>> {
    user_id?: number;
    api_key_id?: number;
  }
}
