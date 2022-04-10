import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShootingStatisticComponent} from './shooting-statistic.component';

describe('ShootingStatistcComponent', () => {
  let component: ShootingStatisticComponent;
  let fixture: ComponentFixture<ShootingStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [ShootingStatisticComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
