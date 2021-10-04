import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WaitlistPersonComponent} from './waitlist-person.component';

describe('WaitlistPersonComponent', () => {
  let component: WaitlistPersonComponent;
  let fixture: ComponentFixture<WaitlistPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [WaitlistPersonComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitlistPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
