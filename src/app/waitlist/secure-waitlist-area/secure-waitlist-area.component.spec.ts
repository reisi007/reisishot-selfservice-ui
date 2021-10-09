import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SecureWaitlistAreaComponent} from './secure-waitlist-area.component';

describe('SecureWaitlistAreaComponent', () => {
  let component: SecureWaitlistAreaComponent;
  let fixture: ComponentFixture<SecureWaitlistAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [SecureWaitlistAreaComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureWaitlistAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
