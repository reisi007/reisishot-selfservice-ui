import {AdminUserData} from './admin-login/AdminUserData';
import {Injectable} from '@angular/core';

const LOCALSTORAGE_ADMIN_KEY = 'admin';

@Injectable()
export class AdminLoginDataService {

  private state!: AdminUserData | null;

  constructor() {
    const item = localStorage.getItem(LOCALSTORAGE_ADMIN_KEY);
    if (item) {
      this.state = JSON.parse(item);
    }
  }

  get data(): AdminUserData | null {
    return this.state;
  }

  set data(value: AdminUserData | null) {
    this.state = value;
    if (value) {
      let stringValue = JSON.stringify(value);
      localStorage.setItem(LOCALSTORAGE_ADMIN_KEY, stringValue);
    }
    else {
      localStorage.removeItem(LOCALSTORAGE_ADMIN_KEY);
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
