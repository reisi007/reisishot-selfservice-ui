import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StatisticPerYearComponent} from './statistic-per-year.component';

describe('ShootingStatistcComponent', () => {
  let component: StatisticPerYearComponent;
  let fixture: ComponentFixture<StatisticPerYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [StatisticPerYearComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticPerYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
