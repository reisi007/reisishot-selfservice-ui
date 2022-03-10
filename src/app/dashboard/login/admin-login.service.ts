import {AdminUserData} from './admin-login/AdminUserData';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {

  private _data: AdminUserData | null = null;


  get data(): AdminUserData | null {
    return this._data;
  }

  set data(value: AdminUserData | null) {
    this._data = value;
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
