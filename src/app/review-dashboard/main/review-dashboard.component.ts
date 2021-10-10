import {Component, OnInit} from '@angular/core';
import {ReviewAdminApiService} from '../api/review-admin-api.service';
import {LoadedReview} from '../../review/api/review.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-review-dashboard',
  templateUrl: './review-dashboard.component.html',
  styleUrls: ['./review-dashboard.component.scss'],
})
export class ReviewDashboardComponent implements OnInit {
  passwordForm!: FormGroup;
  reviews!: Array<LoadedReview> | null;

  constructor(private apiService: ReviewAdminApiService, private formBuilder: FormBuilder) {
  }

  get credentials(): { user: string; pwd: string } {
    return this.passwordForm.getRawValue();
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      user: this.formBuilder.control('', [Validators.required]),
      pwd: this.formBuilder.control('', [Validators.required]),
    });
  }

  fetchAllData() {
    const curData = this.credentials;
    this.apiService.getAllReviews(curData.user, curData.pwd).subscribe(data => (this.reviews = data));
  }
}
