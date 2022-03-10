import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShootingDatesViewComponent} from './shooting-dates-view.component';

describe('ShootingDatesViewComponent', () => {
  let component: ShootingDatesViewComponent;
  let fixture: ComponentFixture<ShootingDatesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [ShootingDatesViewComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingDatesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
