import {Component, Input} from '@angular/core';
import {LoadedReview} from '../../review/api/review.model';

@Component({
  selector: 'app-display-review',
  templateUrl: './display-review.component.html',
  styleUrls: ['./display-review.component.scss'],
})
export class DisplayReviewComponent {

  @Input() review!: LoadedReview;

}
