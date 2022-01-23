import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PendingSignaturesComponent} from './pending-signatures.component';

describe('PendingSignaturesComponent', () => {
  let component: PendingSignaturesComponent;
  let fixture: ComponentFixture<PendingSignaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [PendingSignaturesComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingSignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
