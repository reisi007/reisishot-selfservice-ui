import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LeaderboardByYearComponent} from './leaderboard-by-year.component';

describe('LeaderboardByYearComponent', () => {
  let component: LeaderboardByYearComponent;
  let fixture: ComponentFixture<LeaderboardByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [LeaderboardByYearComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
