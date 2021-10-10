import {Component, OnInit} from '@angular/core';
import {LoadedReview} from '../../api/review.model';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss'],
})
export class AdminReviewComponent implements OnInit {
  review: LoadedReview | null | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.review = history.state.review as LoadedReview | null;
  }

  loadedReview(review: LoadedReview) {
    this.review = review;
  }
}
