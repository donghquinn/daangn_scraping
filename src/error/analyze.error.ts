export class AnalyzeError extends Error {
  type: string;

  constructor(type: string, message: string, cause?: Error) {
    super(message);

    this.type = type;
    this.name = "[ANALYZE]";
    this.cause = cause;
  }
}
