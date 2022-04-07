import {Component, OnInit} from '@angular/core';
import {LoadedReview} from '../../api/review.model';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss'],
})
export class AdminReviewComponent implements OnInit {
  review?: LoadedReview;

  ngOnInit(): void {
    this.review = history.state.review as LoadedReview;
  }

  loadedReview(review: LoadedReview) {
    this.review = review;
  }

  asText(review: LoadedReview): string {
    const lines = new Array<string>();
    lines.push(
      '---',
      'video: ???',
      'image: ???',
      'type: boudoir | beauty | business | sport | pärchen | live',
      'name: ' + review.name,
      'date: ' + review.creation_date.split(' ')[0],
    );
    if (review.rating) {
      lines.push('rating: ' + review.rating);
    }
    lines.push('---');
    if (review.review_public) {
      lines.push(review.review_public);
    }

    return lines.join('\r\n');
  }
}
