import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LazyLoadingImageComponent} from './lazy-loading-image.component';

describe('LazyLoadingImageComponent', () => {
  let component: LazyLoadingImageComponent;
  let fixture: ComponentFixture<LazyLoadingImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [LazyLoadingImageComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyLoadingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
