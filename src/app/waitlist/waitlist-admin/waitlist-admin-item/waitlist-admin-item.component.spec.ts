import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WaitlistAdminItemComponent} from './waitlist-admin-item.component';

describe('WaitlistAdminItemComponent', () => {
  let component: WaitlistAdminItemComponent;
  let fixture: ComponentFixture<WaitlistAdminItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [WaitlistAdminItemComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitlistAdminItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
