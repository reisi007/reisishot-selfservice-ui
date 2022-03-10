import {Component, Input} from '@angular/core';
import {AdminLoginService} from '../../../dashboard/login/admin-login.service';

@Component({
  selector: 'app-shooting-date-view-responsive',
  templateUrl: './shooting-date-view-responsive.component.html',
  styleUrls: ['./shooting-date-view-responsive.component.scss'],
})
export class ShootingDateViewResponsiveComponent {

  constructor(
    private adminLoginService: AdminLoginService,
  ) {
  }

  get isLoggedIn(): boolean {
    return this.adminLoginService.hasData;
  }

  _weeks = 12;

  get weeks(): number {
    return this._weeks;
  }

  @Input()
  set weeks(weeks: number) {
    this._weeks = weeks;
  }

}
