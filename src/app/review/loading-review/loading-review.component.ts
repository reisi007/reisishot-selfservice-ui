import {Component, OnInit} from '@angular/core';
import {LoadedReview} from '../api/review.model';
import {ReviewApiService} from '../api/review-api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-loading-review',
  templateUrl: './loading-review.component.html',
  styleUrls: ['./loading-review.component.scss'],
})
export class LoadingReviewComponent implements OnInit {

  public data: LoadedReview | null;

  constructor(
    private apiService: ReviewApiService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeData => {
      const email = routeData.mail;
      const accessKey = routeData.access_key;

      this.apiService.loadReview(email, accessKey)
          .subscribe(review => {
            if (typeof review.rating === 'string') {
              review.rating = parseInt(review.rating, 10);
            }
            return this.data = review;
          });
    });
  }
}
