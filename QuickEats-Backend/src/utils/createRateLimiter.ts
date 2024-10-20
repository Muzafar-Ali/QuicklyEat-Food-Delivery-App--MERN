import rateLimit from "express-rate-limit";

const createRateLimiter = (maxRequests: number, timeWindowMs: number, message: string) => {
  return rateLimit({
    windowMs: timeWindowMs,  // Time window in milliseconds
    max: maxRequests,        // Max requests per time window
    message: message,        // Custom message when rate limit is exceeded
  });
};

export default createRateLimiter;