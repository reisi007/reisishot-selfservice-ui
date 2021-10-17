import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReferralCustomerInfoComponent} from './referral-customer-info.component';

describe('ReferralCustomerInfoComponent', () => {
  let component: ReferralCustomerInfoComponent;
  let fixture: ComponentFixture<ReferralCustomerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [ReferralCustomerInfoComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralCustomerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
