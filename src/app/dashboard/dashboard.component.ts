import {Component} from '@angular/core';
import {AdminLoginService} from './login/admin-login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  constructor(
    private adminLoginService: AdminLoginService,
  ) {
  }

  get isAdminLoggedIn(): boolean {
    return this.adminLoginService.data != null;
  }

}
