class ErrorResponse extends Error {
  status: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}

class BadRequest extends ErrorResponse {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}

class NotFound extends ErrorResponse {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}

export { ErrorResponse, BadRequest, NotFound };
