import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShootingDateInternalCellComponent} from './shooting-date-internal-cell.component';

describe('ShootingDateInternalCellComponent', () => {
  let component: ShootingDateInternalCellComponent;
  let fixture: ComponentFixture<ShootingDateInternalCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [ShootingDateInternalCellComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingDateInternalCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
