import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReviewChartsComponent} from './review-charts.component';

describe('ReviewChartsComponent', () => {
  let component: ReviewChartsComponent;
  let fixture: ComponentFixture<ReviewChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewChartsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
