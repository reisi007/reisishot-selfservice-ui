import {Component} from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  items: Array<{ name: string, url: string, adminUrl: string }> = [
    {
      name: 'In Warteliste eintragen',
      url: 'waitlist',
      adminUrl: 'waitlist/dashboard',
    }, {
      name: 'Bewertung abgeben',
      url: 'review',
      adminUrl: 'review/dashboard',
    }, {
      name: 'Neuen Vertrag erstellen',
      url: 'contracts',
      adminUrl: 'contracts/dashboard',
    },
  ];
}
