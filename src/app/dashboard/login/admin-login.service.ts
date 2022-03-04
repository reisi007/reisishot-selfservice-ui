import {AdminUserData} from './admin-login/AdminUserData';

export class AdminLoginService {

  private _data: AdminUserData | null = null;


  get data(): AdminUserData | null {
    return this._data;
  }

  set data(value: AdminUserData | null) {
    this._data = value;
  }
}
