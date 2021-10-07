import {Component, Input, OnInit} from '@angular/core';
import {LoadedReview} from '../../review/api/review.model';
import {GaugeChartOptions} from './external-api';
import {RatingInformation} from './chart-api';

@Component({
  selector: 'app-review-charts',
  templateUrl: './review-charts.component.html',
  styleUrls: ['./review-charts.component.scss'],
})
export class ReviewChartsComponent implements OnInit {


  ratingOptions: GaugeChartOptions;
  ratingValues: RatingInformation;

  constructor() {
  }

  // tslint:disable-next-line:variable-name
  _reviews: Array<LoadedReview>;

  get reviews(): Array<LoadedReview> {
    return this._reviews;
  }

  @Input() set reviews(reviews: Array<LoadedReview>) {
    this._reviews = reviews;
    // Update all values
    const ratings = reviews.map(v => v.rating);

    this.ratingValues = new RatingInformation(ratings.length, ratings.reduce((a, b) => a + b) / ratings.length);
  }

  ngOnInit(): void {
    this.ratingOptions = {
      hasNeedle: true,
      needleColor: 'black',
      arcColors: ['red', 'orange', 'yellow', 'lightgreen', 'green'],
      arcDelimiters: [20, 40, 60, 80],
      needleStartValue: 0,
      needleUpdateSpeed: 750,
    } as GaugeChartOptions;
  }

}
