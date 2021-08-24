import {environment} from '../../environments/environment';

export class ApiService {

  protected static buildUrl(...paths: string[]): string {
    return environment.baseUrl + '/' + paths.join('/');
  }

  protected static buildSecuredUrl(email: string, accessKey: string, ...paths: string[]): string {
    return ApiService.buildUrl(...paths) + '?email=' + email + '&access_key=' + accessKey;
  }
}
