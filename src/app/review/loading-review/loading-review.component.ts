import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoadedReview} from '../api/review.model';
import {ReviewApiService} from '../api/review-api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-loading-review',
  templateUrl: './loading-review.component.html',
  styleUrls: ['./loading-review.component.scss'],
})
export class LoadingReviewComponent implements OnInit {
  public data!: LoadedReview | null;

  @Output() loaded = new EventEmitter<LoadedReview>();

  constructor(private apiService: ReviewApiService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeData => {
      const email = routeData['mail'];
      const accessKey = routeData['access_key'];

      this.data = history.state.review as LoadedReview | null;
      if (this.data) {
        return;
      }
      this.apiService.loadReview(email, accessKey).subscribe(
        review => {
          this.loaded.emit(review);
          return (this.data = review);
        },
        _ => this.router.navigate(['review', email], {state: {review: this.data}}),
      );
    });
  }
}
