import {Component, Input} from '@angular/core';
import {ShootingStatisticApiService} from '../api/shooting-statistic-api.service';
import {Chart, ChartDataset, ChartType} from 'chart.js';
import {ShootingStatisticsResponsePerYear} from '../api/Model';

import {AdminLoginDataService} from '../../../dashboard/login/admin-login-data.service';
import {ChartConfig, OVERRIDES, shadeColor, SHARED_OPTIONS, TypedTooltipItem} from '../StatisticUtils';
import {ShootingFormValue} from '../statistics-dashboard.component';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    center: TType extends 'doughnut' ? Partial<TextCenterOptions> : never;
  }
}

type TextCenterOptions = { text: string | ((chart: Chart) => string), color: string, fontStyle: string, sidePadding: number, minFontSize: number, maxFontSize: number, lineHeight: number }


@Component({
  selector: 'app-shooting-per-year-statistc',
  templateUrl: './shooting-per-year-statistc.component.html',
  styleUrls: ['./shooting-per-year-statistc.component.scss'],
})
export class StatisticPerYearComponent {

  @Input()
  set querySettings(value: ShootingFormValue) {
    const {showMinor, showGroups} = value;
    const data = this.adminLoginService.dataOrError;

    this.apiService.getShootingStatisticsPerYear(data, showMinor, showGroups)
        .subscribe({
          next: data => this.mapDataForChart(data),
        });
  }

  chartData: Array<ChartConfig<ChartType>> = [];

  constructor(
    private apiService: ShootingStatisticApiService,
    private adminLoginService: AdminLoginDataService,
  ) {
    Chart.register([{
      id: 'center',
      beforeDraw: function(chart, _, options1) {
        const options = options1 as Partial<TextCenterOptions>;
        if (options && options['text']) {
          let n;
          // Get ctx from string
          const ctx = chart.ctx;
          const {
            fontStyle = 'Arial',
            text: txt,
            color = '#000',
            minFontSize = 20,
            maxFontSize = 75,
            sidePadding = 20,
            lineHeight = 25,
          } = options;
          const text = typeof txt === 'string' ? txt : txt(chart);

          const [chartMeta] = chart.getDatasetMeta(chart.getVisibleDatasetCount() - 1).data;
          const {innerRadius: ir} = chartMeta.getProps(['innerRadius']);
          const innerRadius = ir as number;

          const sidePaddingCalculated = (sidePadding / 100) * (innerRadius * 2);
          // Start with a base font of 30px
          ctx.font = '30px ' + fontStyle;

          // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          const stringWidth = ctx.measureText(text).width;

          const elementWidth = (innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          const widthRatio = elementWidth / stringWidth;
          const newFontSize = Math.floor(30 * widthRatio);
          const elementHeight = (innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);

          let wrapText = false;


          if (minFontSize && fontSizeToUse < minFontSize) {
            fontSizeToUse = minFontSize;
            wrapText = true;
          }

          // Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + 'px ' + fontStyle;
          ctx.fillStyle = color;

          if (!wrapText) {
            ctx.fillText(text, centerX, centerY);
            return;
          }

          var words = text.split(' ');
          var line = '';
          var lines = [];

          // Break words up into multiple lines if necessary
          for (n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > elementWidth && n > 0) {
              lines.push(line);
              line = words[n] + ' ';
            }
            else {
              line = testLine;
            }
          }

          // Move the center up depending on line height and number of lines
          centerY -= (lines.length / 2) * lineHeight;

          for (n = 0; n < lines.length; n++) {
            ctx.fillText(lines[n], centerX, centerY);
            centerY += lineHeight;
          }
          //Draw text in center
          ctx.fillText(line, centerX, centerY);
        }
      },
    }]);
  }

  private mapDataForChart(data: ShootingStatisticsResponsePerYear) {
    const allYears = Object.keys(data);
    const yearsAsInt = allYears.map(y => parseInt(y, 10));

    function computeTotalPerYear(): { [year: string]: number } {
      const o: { [year: string]: number } = {};
      allYears.forEach(year => {
        o[year] = Object.values(data[year]).reduce((a, b) => a + b);
      });
      return o;
    }

    const sortByShootingHelper: { [shooting: string]: number } = {};
    Object.keys(OVERRIDES)
          .forEach((shootingName, idx) => {
            sortByShootingHelper[shootingName] = idx;
          });

    const totalPerYear = computeTotalPerYear();

    const allShootingTypesWithDuplicates = Object.values(data).flatMap(o => Object.keys(o));

    const allShootingTypes = [
      ...new Set(
        allShootingTypesWithDuplicates.sort(
          (a, b) => {
            const sa = sortByShootingHelper[a] ?? 0;
            const sb = sortByShootingHelper[b] ?? 0;
            return sa - sb;
          }),
      ),
    ];

    const maxYear = Math.max(...yearsAsInt);
    const maxYearAsString = String(maxYear);

    function computeAbsoluteDataset(): ChartDataset<'bar', number[]>[] {
      return allShootingTypes.map(type => {
        const color = OVERRIDES[type].color;
        return {
          data: allYears.map(year => {
            const value = data[year][type];
            return value !== undefined ? value : 0;
          }),
          label: type,
          stack: 'a',
          backgroundColor: color,
          hoverBackgroundColor: shadeColor(color, 35),
          tooltip: {
            callbacks: {
              label: (context: TypedTooltipItem<'bar', number>) => {
                return ` ${context.dataset.label} - ${context.label} (${context.raw} / ${totalPerYear[context.label]})`;
              },
            },
          },
        };
      });
    }

    function computeRelativeDataset(): ChartDataset<'bar', number[]>[] {
      return allShootingTypes.map(type => {
        const color = OVERRIDES[type].color;
        return {
          data: allYears.map(year => {
            const value = data[year][type];
            return value !== undefined ? (value / totalPerYear[year] * 100) : 0;
          }),
          label: type,
          stack: 'a',
          backgroundColor: color,
          hoverBackgroundColor: shadeColor(color, 35),
          tooltip: {
            callbacks: {
              label: (context: TypedTooltipItem<'bar', number>) => {
                return ` ${context.dataset.label} - ${context.label} (${context.raw.toFixed(2)}%)`;
              },
            },
          },
        };
      });
    }

    function computeSollIstDataset(): ChartDataset<'doughnut', number[]>[] {
      const backgroundColor = Object.values(OVERRIDES).map(e => e.color);
      const hoverBackgroundColor = Object.values(OVERRIDES).map(e => shadeColor(e.color, 35));

      const yearData = data[maxYearAsString];

      return [
        {
          label: 'Soll',
          data: Object.values(OVERRIDES).map(e => e.expectedPercentage),
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor,
          borderColor: hoverBackgroundColor,
          hoverBorderColor: backgroundColor,
        }, {
          label: maxYearAsString,
          data: Object.keys(OVERRIDES).map(s => yearData[s] / totalPerYear[maxYear] * 100),
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor,
          borderColor: hoverBackgroundColor,
          hoverBorderColor: backgroundColor,
          weight: 2,
        },
      ];
    }

    const perYearDataset = (() => {
      const dataset: { [key: string]: number } = {};
      Object.values(data).forEach(value => {
        Object.entries(value).forEach(([k, d]) => {
          dataset[k] = (dataset[k] || 0) + d;
        });
      });
      return dataset;
    })();

    function computeAllYearsDataset(): ChartDataset<'bar', number[]>[] {
      const backgroundColor = Object.values(OVERRIDES).map(e => e.color);
      const hoverBackgroundColor = Object.values(OVERRIDES).map(e => shadeColor(e.color, 35));

      return [{
        label: 'Gesamt',
        data: Object.keys(OVERRIDES).map((type) => perYearDataset[type]),
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
        borderColor: hoverBackgroundColor,
        hoverBorderColor: backgroundColor,
      }];

    }

    this.chartData = [
      {
        title: `Soll / Ist Statistik ${maxYearAsString}`,
        labels: Object.keys(OVERRIDES),
        dataSet: computeSollIstDataset(),
        chartLegend: true,
        chartType: 'doughnut',
        options: {
          ...SHARED_OPTIONS,
          plugins: {
            center: {
              text: totalPerYear[maxYear].toString(10),
            },
            tooltip: {
              callbacks: {
                label: (item) => ` ${item.dataset.label} - ${item.label}: ${(item as TypedTooltipItem<'doughnut', number>).raw.toFixed(2)}%`,
              },
            },
          },
        },
      },
      {
        title: 'Relativ pro Jahr',
        labels: allYears,
        dataSet: computeRelativeDataset(),
        chartType: 'bar',
        chartLegend: true,
        options: {
          ...SHARED_OPTIONS,
          scales: {
            y: {
              max: 100,
              ticks: {
                callback: (value) => `${value}%`,
              },
            },
          },
        },
      },
      {
        title: 'Absolut pro Jahr',
        labels: allYears,
        dataSet: computeAbsoluteDataset(),
        chartType: 'bar',
        chartLegend: true,
        options: SHARED_OPTIONS,
      }, {
        title: 'Absolut Gesamt',
        labels: Object.values(allShootingTypes),
        dataSet: computeAllYearsDataset(),
        chartType: 'doughnut',
        chartLegend: true,
        options: {
          ...SHARED_OPTIONS,
          plugins: {
            tooltip: {
              callbacks: {
                label: (item) => ` ${item.label} - ${item.parsed} / ${Object.values(perYearDataset).reduce((a, b) => a + b)}`,
              },
            },
          },
        },
      },
    ];
  };
}
