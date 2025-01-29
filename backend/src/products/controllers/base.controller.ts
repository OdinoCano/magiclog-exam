export abstract class BaseController {
  protected handleResponse<T>(promise: Promise<T>): Promise<T> {
    return promise.catch(error => {
      // Common error handling logic
      throw error;
    });
  }
}