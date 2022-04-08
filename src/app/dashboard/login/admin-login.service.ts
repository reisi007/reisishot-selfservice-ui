import {AdminUserData} from './admin-login/AdminUserData';
import {Injectable} from '@angular/core';
import {accessState} from '../AppState';

@Injectable()
export class AdminLoginService {

  private state!: { userData: AdminUserData | null };

  constructor() {
    this.state = accessState('adminLoginService');
  }

  get data(): AdminUserData | null {
    return this.state.userData || null;
  }

  set data(value: AdminUserData | null) {
    this.state.userData = value;
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
