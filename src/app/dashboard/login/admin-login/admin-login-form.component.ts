import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminLoginDataService} from '../admin-login-data.service';
import {AdminUserData} from './AdminUserData';
import {AdminLoginService} from './admin-login.service';

@Component({
  selector: 'app-admin-login-form',
  templateUrl: './admin-login-form.component.html',
  styleUrls: ['./admin-login-form.component.scss'],
})
export class AdminLoginFormComponent implements OnInit {

  passwordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminDataLoginService: AdminLoginDataService,
    private adminLoginService: AdminLoginService,
  ) {
  }

  get credentialsAvailable(): boolean {
    return this.adminDataLoginService.hasData;
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      user: this.formBuilder.control('', [Validators.required]),
      pwd: this.formBuilder.control('', [Validators.required]),
    });
  }

  submitValue() {
    this.adminLoginService.login(this.passwordForm.value as AdminUserData).subscribe({
      next: value => this.adminDataLoginService.data = {user: value.user, pwd: value.hash},
      error: () => this.adminDataLoginService.data = null,
    });
  }
}
