
export const shouldRetryUpload = (errorCode: number) => {
  // Implement logic to check for retryable errors (e.g., timeout codes)
  return errorCode === 499; // Example check for timeout
}