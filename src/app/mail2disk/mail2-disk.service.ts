import {Injectable} from '@angular/core';
import {ApiService} from '../commons/ApiService';
import {HttpClient} from '@angular/common/http';
import {distinctUntilChanged, mergeMap, Observable, timer} from 'rxjs';
import {NgHttpCachingHeaders} from 'ng-http-caching';
import {extract, LetterparserMail, LetterparserNode, parse} from 'letterparser';
import {map} from 'rxjs/operators';

@Injectable()
export class Mail2DiskService extends ApiService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getLatestMail(): Observable<[LetterparserMail, LetterparserNode]> {
    return timer(0, 5_000).pipe(
      mergeMap(() => this.getLatestMailInternal()),
      distinctUntilChanged(),
      map(s => [extract(s), parse(s)]),
    );

  }

  private getLatestMailInternal(): Observable<string> {
    return this.httpClient.get(ApiService.buildUrl('api', 'mail2disk_get.php'), {
      headers: {[NgHttpCachingHeaders.DISALLOW_CACHE]: '1'},
      responseType: 'text',
    });
  }
}
