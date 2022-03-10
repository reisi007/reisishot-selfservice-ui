import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminLoginService} from '../admin-login.service';
import {AdminUserData} from './AdminUserData';

@Component({
  selector: 'app-admin-login-form',
  templateUrl: './admin-login-form.component.html',
  styleUrls: ['./admin-login-form.component.scss'],
})
export class AdminLoginFormComponent implements OnInit {

  passwordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminLoginService: AdminLoginService,
  ) {
  }

  get credentialsAvailable(): boolean {
    return this.adminLoginService.hasData;
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      user: this.formBuilder.control('', [Validators.required]),
      pwd: this.formBuilder.control('', [Validators.required]),
    });
  }

  submitValue() {
    this.adminLoginService.data = this.passwordForm.value as AdminUserData;
  }
}
