import {Component, Input} from '@angular/core';
import {LoadedReview} from '../../../review/api/review.model';
import {RatingInformation} from './chart-api';

@Component({
  selector: 'app-review-info',
  templateUrl: './review-info.component.html',
  styleUrls: ['./review-info.component.scss'],
})
export class ReviewInfoComponent {
  ratingValues!: RatingInformation;
  _reviews!: Array<LoadedReview>;

  get reviews(): Array<LoadedReview> {
    return this._reviews;
  }

  @Input() set reviews(reviews: Array<LoadedReview>) {
    this._reviews = reviews;
    // Update all values
    const ratings = reviews
      .filter(v => v.rating !== null)
      .map(v => v.rating as number);

    this.ratingValues = new RatingInformation(ratings.length, ratings.reduce((a, b) => a + b) / ratings.length);
  }

  widthAsPercent() {
    return Math.max(0, this.ratingValues.avg - 3);
  }
}
