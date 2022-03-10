import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShootingDateCellComponent} from './shooting-date-cell.component';

describe('ShootingDateCellComponent', () => {
  let component: ShootingDateCellComponent;
  let fixture: ComponentFixture<ShootingDateCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [ShootingDateCellComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingDateCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
