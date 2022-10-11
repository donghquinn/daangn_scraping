export class MysqlError extends Error {
  type: string;

  code: string;

  constructor(type: string, code: string, message: string) {
    super(message);

    this.name = "MysqlError";
    this.type = type;
    this.code = code;
  }
}
