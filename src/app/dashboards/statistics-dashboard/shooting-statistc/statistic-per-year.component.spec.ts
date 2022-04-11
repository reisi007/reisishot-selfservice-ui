import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {StatisticPerYearComponent} from './statistic-per-year.component';
import {ShootingStatisticApiService} from '../api/shooting-statistic-api.service';
import {AdminLoginService} from '../../../dashboard/login/admin-login.service';
import {ReactiveFormsModule} from '@angular/forms';

describe('ShootingStatistcComponent', () => {
  let component: StatisticPerYearComponent;
  let fixture: ComponentFixture<StatisticPerYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   imports: [HttpClientModule, ReactiveFormsModule],
                   declarations: [StatisticPerYearComponent],
                   providers: [ShootingStatisticApiService, AdminLoginService],
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
    const sum = Object.values(StatisticPerYearComponent.overrides)
                      .map(e => e.expectedPercentage)
                      .filter(e => e > 0)
                      .reduce((a, b) => a + b);

    expect(sum).toBeCloseTo(100, 0.0001);
  });
});
