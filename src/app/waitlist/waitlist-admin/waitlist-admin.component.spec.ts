import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WaitlistAdminComponent} from './waitlist-admin.component';

describe('WaitlistAdminComponent', () => {
  let component: WaitlistAdminComponent;
  let fixture: ComponentFixture<WaitlistAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [WaitlistAdminComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitlistAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
