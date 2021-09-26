import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ReviewApiService} from './api/review-api.service';
import {LoadedReview, UpdatableReview} from './api/review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {

  reviewData: FormGroup;
  minWordsCnt = 15;
  public minWordRegexp = new RegExp('\\s*?(\\S+?\\s+?){' + (this.minWordsCnt - 1) + ',}\\S+?');
  emailDisabled = null;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private apiService: ReviewApiService) {
    this.reviewData = this.formBuilder.group({
      rating: this.formBuilder.control(0, [Validators.min(1)]),
      name: this.formBuilder.control('', [Validators.required]),
      access_key: this.formBuilder.control(''),
      email: this.formBuilder.control('', [Validators.email, Validators.required]),
      review_private: this.formBuilder.control('', []),
      review_public: this.formBuilder.control('', [Validators.required, Validators.pattern(this.minWordRegexp)]),
    });
  }

  @Input() set rawData(data: LoadedReview) {
    this.reviewData.patchValue(data);
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeData => {
      if (routeData.mail) {
        this.emailDisabled = true;
        this.reviewData.get('email').setValue(routeData.mail);
      }
      if (routeData.access_key) {
        this.reviewData.get('access_key').setValue(routeData.access_key);
      }
    });
  }

  setValue(rating: number) {
    this.reviewData.get('rating').setValue(rating);
  }

  saveReview() {
    const review = this.reviewData.getRawValue() as UpdatableReview;

    this.apiService.saveReview(review)
        .subscribe(result => this.reviewData.get('access_key').setValue(result.access_key));
  }
}
