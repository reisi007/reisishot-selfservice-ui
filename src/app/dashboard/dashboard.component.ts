import {Component, OnInit} from '@angular/core';
import {AdminLoginDataService} from './login/admin-login-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private adminLoginService: AdminLoginDataService,
    private router: Router,
  ) {
  }

  get isAdminLoggedIn(): boolean {
    return this.adminLoginService.hasData;
  }

  ngOnInit(): void {
    if (!this.isAdminLoggedIn) {
      this.router.navigate(['/dashboard', 'login'], {replaceUrl: true});
    }
  }

}
