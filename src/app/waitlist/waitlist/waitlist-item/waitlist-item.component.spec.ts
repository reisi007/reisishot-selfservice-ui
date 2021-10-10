import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WaitlistItemComponent} from './waitlist-item.component';

describe('WaitlistItemComponent', () => {
  let component: WaitlistItemComponent;
  let fixture: ComponentFixture<WaitlistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaitlistItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitlistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
