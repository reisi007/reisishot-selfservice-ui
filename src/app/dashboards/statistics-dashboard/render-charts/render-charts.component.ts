import {Component, Input} from '@angular/core';
import {ChartConfig} from '../StatisticUtils';

@Component({
  selector: 'app-render-charts',
  templateUrl: './render-charts.component.html',
  styleUrls: ['./render-charts.component.scss'],
})
export class RenderChartsComponent {

  @Input()
  chartData!: Array<ChartConfig<any>>;
}
