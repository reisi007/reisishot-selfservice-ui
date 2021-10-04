import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WaitlistDashboardItemComponent} from './waitlist-dashboard-item.component';

describe('WaitlistAdminItemComponent', () => {
  let component: WaitlistDashboardItemComponent;
  let fixture: ComponentFixture<WaitlistDashboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [WaitlistDashboardItemComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitlistDashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
