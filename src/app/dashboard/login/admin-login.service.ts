import {AdminUserData} from './admin-login/AdminUserData';
import {Injectable, isDevMode} from '@angular/core';

declare global {
  interface Window {
    adminLoginData?: AdminUserData | null;
  }
}

@Injectable()
export class AdminLoginService {

  constructor() {
    const loginData = window.adminLoginData;
    if (loginData) {
      this._data = loginData;
    }
  }

  private _data: AdminUserData | null = null;

  get data(): AdminUserData | null {
    return this._data;
  }

  set data(value: AdminUserData | null) {
    this._data = value;
    if (isDevMode() && value) {
      window.adminLoginData = value;
    }
  }

  get dataOrError(): AdminUserData {
    const data = this.data;
    if (data == null) {
      throw Error('Calling function, which requires log-in');
    }
    return data;
  }

  get hasData(): boolean {
    return !!this.data;
  }
}
