import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReviewLandingComponent} from './review-landing.component';

describe('ReviewLandingComponent', () => {
  let component: ReviewLandingComponent;
  let fixture: ComponentFixture<ReviewLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewLandingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
