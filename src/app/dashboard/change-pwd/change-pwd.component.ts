import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../commons/ApiService';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss'],
})
export class ChangePwdComponent extends ApiService implements OnInit {
  pwdChangeForm!: FormGroup;

  showForm = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.pwdChangeForm = this.formBuilder.group({
      oldUser: this.formBuilder.control('', [Validators.required]),
      oldPwd: this.formBuilder.control('', [Validators.required]),
      newUser: this.formBuilder.control('', [Validators.required]),
      newPwd: this.formBuilder.control('', [Validators.required]),
    });
  }

  changePassword() {
    const data = this.changePasswordData();

    this.http
        .post(
          ApiService.buildUrl('api', 'change-pwd_post.php'),
          {user: data.newUser, pwd: data.newPwd},
          {headers: ApiService.buildHeaders(data.oldUser, data.oldPwd)},
        )
        .subscribe(() => (this.showForm = false));
  }

  changePasswordData(): PwdChangeValue {
    return this.pwdChangeForm.getRawValue();
  }
}

export interface PwdChangeValue {
  oldUser: string;
  oldPwd: string;
  newUser: string;
  newPwd: string;
}
