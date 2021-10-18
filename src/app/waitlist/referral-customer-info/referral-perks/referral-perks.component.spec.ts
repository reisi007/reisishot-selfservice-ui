import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReferralPerksComponent} from './referral-perks.component';

describe('ReferralPerksComponent', () => {
  let component: ReferralPerksComponent;
  let fixture: ComponentFixture<ReferralPerksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [ReferralPerksComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralPerksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
