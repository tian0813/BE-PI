export const getErrorMessage = (error: unknown): string => {
  if (error === null || error === undefined) {
    return 'An unknown error occurred';
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return 'An unknown error occurred';
};