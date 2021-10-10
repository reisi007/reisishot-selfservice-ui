import {Injectable} from '@angular/core';
import {ApiService} from '../../commons/ApiService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoadedReview} from '../../review/api/review.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReviewAdminApiService extends ApiService {
  constructor(private http: HttpClient) {
    super();
  }

  public getAllReviews(email: string, accessKey: string): Observable<Array<LoadedReview>> {
    return this.http
               .get<Array<LoadedReview>>(ApiService.buildUrl('api', 'reviews-admin_get.php'), {headers: ApiService.buildHeaders(email, accessKey)})
               .pipe(
                 map(data => {
                   return data.map(review => {
                     if (typeof review.rating === 'string') {
                       review.rating = parseInt(review.rating, 10);
                     }
                     return review;
                   });
                 }),
               );
  }
}
