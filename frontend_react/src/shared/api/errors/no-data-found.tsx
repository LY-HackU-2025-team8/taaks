export class NoDataFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoDataFoundError';
  }
}
