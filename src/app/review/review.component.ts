import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {

  reviewData: FormGroup;
  public minWordRegexp = /\s*?(\S+?\s+?){20,}\S*?/;
  email: string;
  accessKey: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.reviewData = this.formBuilder.group({
      rating: this.formBuilder.control(0, [Validators.min(1)]),
      name: this.formBuilder.control('', [Validators.required]),
      review: this.formBuilder.control('', [Validators.required, Validators.pattern(this.minWordRegexp)]),
    });

    this.route.params.subscribe(routeData => {
      this.email = routeData.mail;
      this.accessKey = routeData.access_key;
    });
  }

  setValue(rating: number) {
    this.reviewData.get('rating').setValue(rating);
  }

  saveReview() {
    const review = this.reviewData.getRawValue();

    console.log(review);
  }
}
