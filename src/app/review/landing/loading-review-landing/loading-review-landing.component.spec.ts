import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadingReviewLandingComponent} from './loading-review-landing.component';

describe('LoadingReviewLandingComponent', () => {
  let component: LoadingReviewLandingComponent;
  let fixture: ComponentFixture<LoadingReviewLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [LoadingReviewLandingComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingReviewLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
