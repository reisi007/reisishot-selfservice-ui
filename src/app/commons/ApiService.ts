import {environment} from '../../environments/environment';

export class ApiService {

  string;

  protected static buildUrl(...paths: string[]): string {
    return environment.baseUrl + '/' + paths.join('/');
  }

  protected static buildHeaders(email: string, accessKey: string): { [header: string]: string } {
    return {
      Email: email,
      Accesskey: accessKey,
    };
  }
}
