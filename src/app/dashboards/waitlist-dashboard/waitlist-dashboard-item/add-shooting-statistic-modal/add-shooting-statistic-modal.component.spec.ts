import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddShootingStatisticModalComponent} from './add-shooting-statistic-modal.component';

describe('AddShootingStatisticModalComponent', () => {
  let component: AddShootingStatisticModalComponent;
  let fixture: ComponentFixture<AddShootingStatisticModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [AddShootingStatisticModalComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShootingStatisticModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
