import JwtService from '@/services/jwt.service';

export default class BaseClass {

  protected _baseUrl: string = "localhost:5000";

  protected transformOptions(options: RequestInit) {
    // TODO: Change options if required
    const token = "Bearer " + JwtService.getToken();
    options.headers['Authorization'] = token;
    return Promise.resolve(options);
  }

  protected transformResult(url: string, response: Response, processor: (response: Response) => any) {
    // TODO: Return own result or throw exception to change default processing behavior, 
    // or call processor function to run the default processing logic

    return processor(response);
  }

  protected getBaseUrl(url: string) {
    if (url === null || url === '') {
      return this._baseUrl;
    } else {
      return url;
    }
  }
}