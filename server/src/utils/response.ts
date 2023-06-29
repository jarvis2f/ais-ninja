type ResponseData = Record<string, any>;

class ApiResponse {
  code: number;
  data: ResponseData;
  message: string;

  constructor(code: number, data: ResponseData = {}, message: string = '') {
    this.code = code;
    this.data = data;
    this.message = message;
  }

  static success(data: ResponseData | any = {}, message: string = 'Success') {
    return new ApiResponse(0, data, message);
  }

  static server_error() {
    return new ApiResponse(500, {}, 'Server Error');
  }

  static error(code: number, message: string) {
    return new ApiResponse(code, {}, message);
  }

  static miss() {
    return new ApiResponse(400, {}, '缺少必要参数');
  }
}

export default ApiResponse;
