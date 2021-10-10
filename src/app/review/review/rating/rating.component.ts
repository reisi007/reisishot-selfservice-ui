import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() public style!: string;

  @Input() public min!: number;
  @Input() public max!: number;
  @Output()
  public newValue = new EventEmitter<number | null>();
  @Input()
  public inputForm: FormGroup;
  stars = 0;
  halfStarNeeded = false;
  emptyStars = 5;
  private intEditable!: boolean;
  private step!: number;

  constructor(private formBuilder: FormBuilder) {
    this.inputForm = this.formBuilder.group({
      rating: this.formBuilder.control(this.value ?? 0, [Validators.required, Validators.min(this.min), Validators.max(this.max)]),
    });
  }

  @Input()
  set value(value: number | null) {
    if (value != null) {
      this.rating = value;
    }
  }

  public get editable(): boolean {
    return this.intEditable;
  }

  @Input()
  public set editable(value: boolean) {
    this.intEditable = value;
  }

  get rating(): number {
    const rating = this.inputForm.get('rating')?.value;

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

  set rating(num: number) {
    this.inputForm.get('rating')?.setValue(num);
  }

  ngOnInit(): void {
    this.step = (this.max - this.min) / 5;

    this.inputForm.get('rating')?.valueChanges.subscribe(() => this.recalculateRating());

    this.recalculateRating();
  }

  starClicked(e: MouseEvent) {
    if (!this.editable) {
      return;
    }
    const targetHtmlElement: HTMLElement = e.target as HTMLElement;
    const htlmlElementChildren = targetHtmlElement?.parentElement?.children;
    if (htlmlElementChildren == null) {
      return;
    }
    const children = Array.from(htlmlElementChildren);
    let clickedStar = children.indexOf(targetHtmlElement) + 1;

    const clickX = e.clientX;
    const targetRect = targetHtmlElement.getBoundingClientRect();

    const halfStar = targetRect.x + targetRect.width / 2 > clickX;
    if (halfStar) {
      clickedStar -= 0.5;
    }
    this.rating = Math.ceil(clickedStar * this.step);
  }

  private recalculateRating() {
    const roundedRating = Math.round(this.rating / (this.step / 2));
    this.stars = Math.floor(roundedRating / 2);
    this.halfStarNeeded = 2 * this.stars < roundedRating;
    this.emptyStars = 5 - this.stars - (this.halfStarNeeded ? 1 : 0);
    this.newValue.emit(this.rating);
  }
}
