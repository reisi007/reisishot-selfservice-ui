import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  @Input() public min: number;
  @Input() public max: number;
  @Output()
  public newValue = new EventEmitter<number | null>();
  inputForm: FormGroup;
  stars = 0;
  halfStarNeeded = false;
  emptyStars = 5;
  private intEditable: boolean;
  @Input()
  private intValue: number | null = null;
  private steps: number;

  constructor(private formBuilder: FormBuilder) {
  }

  public get editable(): boolean {
    return this.intEditable;
  }

  @Input()
  public set editable(value: boolean) {
    this.intEditable = value;
  }

  private get rating(): number {
    const rating = this.inputForm.get('rating').value;

    if (rating > this.max) {
      return this.max;
    }
    if (rating < this.min) {
      return this.min;
    }

    if (!this.inputForm.valid || rating == null) {
      return 0;
    }
    return rating;
  }

  ngOnInit(): void {
    this.steps = (this.max - this.min) / 5;
    this.inputForm = this.formBuilder.group({
      rating: this.formBuilder.control(this.intValue ?? 0,
        [Validators.required, Validators.min(this.min), Validators.max(this.max)]),
    });
    this.inputForm.get('rating')
        .valueChanges.subscribe(_ => {
      const rating = this.rating;
      console.log(rating);
      this.stars = Math.floor(rating / this.steps);
      this.halfStarNeeded = this.steps * this.stars + this.steps / 2 <= rating;
      this.emptyStars = 5 - this.stars - (this.halfStarNeeded ? 1 : 0);

      return this.newValue.emit(rating);
    });
  }

}
