import {Component} from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  items = [
    {
      name: 'In Warteliste eintragen',
      url: 'waitlist',
    }, {
      name: 'Neuen Vertrag erstellen',
      url: 'contracts',
    },
  ];

}
