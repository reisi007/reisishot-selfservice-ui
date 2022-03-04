import {Component, OnInit} from '@angular/core';
import {AdminLoginService} from './login/admin-login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private adminLoginService: AdminLoginService,
    private router: Router,
  ) {
  }

  get isAdminLoggedIn(): boolean {
    return this.adminLoginService.data != null;
  }

  ngOnInit(): void {
    if (!this.isAdminLoggedIn) {
      this.router.navigate(['/dashboard', 'login']);
    }
  }

}
