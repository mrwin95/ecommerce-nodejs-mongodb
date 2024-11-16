class SuccessResponse {
  message: string;
  statusCode: number;
  reasonStatusCode: string;
  metadata: {};
  constructor({
    message,
    statusCode,
    reasonStatusCode,
    metadata,
  }: {
    message: string;
    statusCode: number;
    reasonStatusCode: string;
    metadata: any;
  }) {
    this.message = message;
    this.statusCode = statusCode;
    this.reasonStatusCode = reasonStatusCode;
    this.metadata = metadata;
  }

  send(res: any, headers = {}) {
    res.status(this.statusCode).json(this);
  }
}

class OK extends SuccessResponse {
  constructor(message: string, metadata = {}) {
    super({
      message,
      statusCode: 200,
      reasonStatusCode: "OK",
      metadata,
    });
  }
}

class Created extends SuccessResponse {
  constructor(message: string, metadata = {}) {
    super({
      message,
      statusCode: 201,
      reasonStatusCode: "Created",
      metadata,
    });
  }
}

export { SuccessResponse, OK, Created };
