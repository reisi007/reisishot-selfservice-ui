import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewContractChooserComponent} from './preview-contract-chooser.component';

describe('PreviewContractChooserComponent', () => {
  let component: PreviewContractChooserComponent;
  let fixture: ComponentFixture<PreviewContractChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewContractChooserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewContractChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
