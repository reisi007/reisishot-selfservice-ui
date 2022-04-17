import {Injectable} from '@angular/core';
import {ApiService} from '../../commons/ApiService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoadedReview, UpdatableReview} from './review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewApiService extends ApiService {
  constructor(private http: HttpClient) {
    super();
  }


  public loadReview(email: string, accessKey: string): Observable<LoadedReview> {
    return this.http
               .get<LoadedReview>(
                 ApiService.buildUrl('api', 'reviews_get.php'),
                 {headers: ApiService.buildHeaders(email, accessKey)},
               );

  }

  public saveReview(review: UpdatableReview): Observable<{ access_key: string }> {
    return this.http.post<{ access_key: string }>(
      ApiService.buildUrl('api', 'reviews_post.php'), review,
      {headers: ApiService.buildHeaders(review.email, review.access_key)},
    );
  }
}
