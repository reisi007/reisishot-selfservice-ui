import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WaitlistDashboardComponent} from './waitlist-dashboard.component';

describe('WaitlistAdminComponent', () => {
  let component: WaitlistDashboardComponent;
  let fixture: ComponentFixture<WaitlistDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [WaitlistDashboardComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitlistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
