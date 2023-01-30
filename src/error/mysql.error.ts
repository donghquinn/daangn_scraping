export class MysqlError extends Error {
  type: string;

  constructor(type: string, message: string, cause?: Error) {
    super(message);

    this.name = "MysqlError";
    this.type = type;
    this.cause = cause;
  }
}
