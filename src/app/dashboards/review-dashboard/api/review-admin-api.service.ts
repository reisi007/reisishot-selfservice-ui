import {Injectable} from '@angular/core';
import {ApiService} from '../../../commons/ApiService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoadedReview} from '../../../review/api/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewAdminApiService extends ApiService {
  constructor(private http: HttpClient) {
    super();
  }

  public getAllReviews(email: string, accessKey: string): Observable<Array<LoadedReview>> {
    return this.http
               .get<Array<LoadedReview>>(
                 ApiService.buildUrl('api', 'reviews-admin_get.php'),
                 {headers: ApiService.buildHeaders(email, accessKey)},
               );
  }
}
