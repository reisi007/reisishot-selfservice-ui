import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadingReviewComponent} from './loading-review.component';

describe('LoadingReviewComponent', () => {
  let component: LoadingReviewComponent;
  let fixture: ComponentFixture<LoadingReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingReviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
