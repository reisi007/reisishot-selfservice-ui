import {Component} from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  items: Array<{ name: string; url: string[] }> = [
    {
      name: 'In Warteliste eintragen',
      url: ['waitlist'],
    },
    {
      name: 'Bewertung abgeben',
      url: ['review'],
    },
    {
      name: 'Admin Dashboard',
      url: ['dashboard'],
    },
  ];
}
