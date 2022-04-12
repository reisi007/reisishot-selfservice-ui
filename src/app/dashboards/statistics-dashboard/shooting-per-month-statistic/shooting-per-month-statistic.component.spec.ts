import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShootingPerMonthStatisticComponent} from './shooting-per-month-statistic.component';

describe('ShootingPerMonthstatisticComponent', () => {
  let component: ShootingPerMonthStatisticComponent;
  let fixture: ComponentFixture<ShootingPerMonthStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [ShootingPerMonthStatisticComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingPerMonthStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
