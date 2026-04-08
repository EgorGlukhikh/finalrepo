export class AuthError extends Error {
  constructor(
    public readonly code: 'EMAIL_TAKEN' | 'INVALID_INPUT' | 'UNKNOWN',
    message: string,
    public readonly status = 400,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}
