import { rateLimit, RateLimitRequestHandler } from 'express-rate-limit';

export default class RateLimiter {
  private static ONE_SECOND_IN_MS = 1000;

  private static MAX_REQUESTS = 5;

  private static MESSAGE = {
    message: `you have exceeded ${this.MAX_REQUESTS} requests limit per second`,
  };

  public static createRateLimiter(): RateLimitRequestHandler {
    return rateLimit({
      windowMs: this.ONE_SECOND_IN_MS,
      max: this.MAX_REQUESTS,
      message: this.MESSAGE,
      standardHeaders: true,
      legacyHeaders: false,
    });
  }
}
