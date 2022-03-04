import {Component, OnInit} from '@angular/core';
import {ReviewAdminApiService} from '../api/review-admin-api.service';
import {LoadedReview} from '../../../review/api/review.model';
import {AdminUserData} from '../../../dashboard/login/admin-login/AdminUserData';
import {AdminLoginService} from '../../../dashboard/login/admin-login.service';

@Component({
  selector: 'app-review-dashboard',
  templateUrl: './review-dashboard.component.html',
  styleUrls: ['./review-dashboard.component.scss'],
})
export class ReviewDashboardComponent implements OnInit {

  reviews!: Array<LoadedReview> | null;

  constructor(
    private apiService: ReviewAdminApiService,
    private adminLoginService: AdminLoginService,
  ) {
  }

  get credentials(): AdminUserData | null {
    return this.adminLoginService.data;
  }

  ngOnInit(): void {
    this.fetchAllData();
  }

  fetchAllData() {
    const curData = this.credentials;
    if (curData == null) {
      return;
    }
    this.apiService.getAllReviews(curData.user, curData.pwd).subscribe(data => (this.reviews = data));
  }
}
