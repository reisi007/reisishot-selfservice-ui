import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RenderChartsComponent} from './render-charts.component';

describe('RenderChartsComponent', () => {
  let component: RenderChartsComponent;
  let fixture: ComponentFixture<RenderChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [RenderChartsComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
