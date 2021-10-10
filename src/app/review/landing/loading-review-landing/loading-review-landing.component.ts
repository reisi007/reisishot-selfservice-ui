import {Component} from '@angular/core';
import {LoadedReview} from '../../api/review.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-loading-review-landing',
  templateUrl: './loading-review-landing.component.html',
  styleUrls: ['./loading-review-landing.component.scss'],
})
export class LoadingReviewLandingComponent {
  review: LoadedReview | null | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  isLoaded($event: LoadedReview) {
    this.review = $event;
  }

  gotoAdmin() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['admin'], {state: {review: this.review}, relativeTo: this.route});
  }
}
