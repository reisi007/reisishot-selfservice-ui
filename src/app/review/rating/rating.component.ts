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
  @Input()
  public inputForm: FormGroup;
  stars = 0;
  halfStarNeeded = false;
  emptyStars = 5;
  private intEditable: boolean;
  @Input()
  private intValue: number | null = null;
  private step: number;

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

  private set rating(num: number) {
    this.inputForm.get('rating').setValue(num);
  }

  ngOnInit(): void {
    this.step = (this.max - this.min) / 5;

    this.inputForm = this.formBuilder.group({
      rating: this.formBuilder.control(this.intValue ?? 0,
        [Validators.required, Validators.min(this.min), Validators.max(this.max)]),
    });

    this.inputForm.get('rating')
        .valueChanges.subscribe(_ => {
      const rating = this.rating;
      this.stars = Math.floor(rating / this.step);
      this.halfStarNeeded = this.step * this.stars + this.step / 2 <= rating;
      this.emptyStars = 5 - this.stars - (this.halfStarNeeded ? 1 : 0);
      this.newValue.emit(rating);
    });
  }

  starClicked(e: MouseEvent) {
    const targetHtmlElement: HTMLElement = e.target as HTMLElement;
    const children = Array.from(targetHtmlElement.parentElement.children);
    let clickedStar = children.indexOf(targetHtmlElement) + 1;

    const clickX = e.clientX;
    const targetRect = targetHtmlElement.getBoundingClientRect();

    const halfStar = targetRect.x + targetRect.width / 2 > clickX;
    if (halfStar) {
      clickedStar -= 0.5;
    }

    this.rating = Math.ceil(clickedStar * this.step);
    console.log('Value:', this.rating);

  }
}
