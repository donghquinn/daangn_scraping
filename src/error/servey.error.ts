export class SurveyError extends Error {
  type: string;

  constructor(type: string, message: string, cause?: Error) {
    super(message);

    this.type = type;
    this.name = "[SURVEY]";
    this.cause = cause;
  }
}
