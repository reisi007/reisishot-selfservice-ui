import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {StatisticPerYearComponent} from './statistic-per-year.component';
import {ShootingStatisticApiService} from '../api/shooting-statistic-api.service';
import {AdminLoginDataService} from '../../../dashboard/login/admin-login-data.service';
import {ReactiveFormsModule} from '@angular/forms';
import {OVERRIDES} from '../StatisticUtils';

describe('ShootingStatistcComponent', () => {
  let component: StatisticPerYearComponent;
  let fixture: ComponentFixture<StatisticPerYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   imports: [HttpClientModule, ReactiveFormsModule],
                   declarations: [StatisticPerYearComponent],
                   providers: [ShootingStatisticApiService, AdminLoginDataService],
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

  it(('sum of expectedPercentages should be 100'), () => {
    const sum = Object.values(OVERRIDES)
                      .map(e => e.expectedPercentage)
                      .filter(e => e > 0)
                      .reduce((a, b) => a + b);

    expect(sum).toBeCloseTo(100, 0.0001);
  });
});
