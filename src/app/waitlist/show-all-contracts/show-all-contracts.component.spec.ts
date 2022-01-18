import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShowAllContractsComponent} from './show-all-contracts.component';

describe('ShowAllContractsComponent', () => {
  let component: ShowAllContractsComponent;
  let fixture: ComponentFixture<ShowAllContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [ShowAllContractsComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
