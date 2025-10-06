import { GoogleAPIError } from '@/types/google-api';

export class ReportGenerationError extends Error {
  constructor(
    public service: string,
    public statusCode: number,
    message: string,
    public retryable: boolean = false,
    public needsReauth: boolean = false
  ) {
    super(message);
    this.name = 'ReportGenerationError';
  }
}

export const handleGoogleAPIError = (
  error: any,
  service: 'gsc' | 'ga4' | 'pagespeed'
): GoogleAPIError => {
  console.error(`${service.toUpperCase()} API Error:`, error);

  // Authentication errors
  if (error.code === 401 || error.status === 401) {
    return {
      service,
      statusCode: 401,
      message: 'Authentication expired. Please reconnect your Google account.',
      retryable: false,
      needsReauth: true
    };
  }

  // Rate limiting
  if (error.code === 429 || error.status === 429) {
    return {
      service,
      statusCode: 429,
      message: 'API rate limit exceeded. Please try again in a few minutes.',
      retryable: true
    };
  }

  // Quota exceeded
  if (error.code === 403 || error.status === 403) {
    return {
      service,
      statusCode: 403,
      message: 'API quota exceeded for today. Please try again tomorrow.',
      retryable: false
    };
  }

  // Server errors (retryable)
  if (error.code >= 500 || error.status >= 500) {
    return {
      service,
      statusCode: error.code || error.status || 500,
      message: 'Google API temporarily unavailable. Please try again.',
      retryable: true
    };
  }

  // Client errors (not retryable)
  return {
    service,
    statusCode: error.code || error.status || 400,
    message: error.message || 'Unknown API error occurred',
    retryable: false
  };
};

export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Check if error is retryable
      if (error instanceof ReportGenerationError && !error.retryable) {
        throw error;
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      console.log(`Retry attempt ${attempt + 1} after ${delay}ms delay`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
};