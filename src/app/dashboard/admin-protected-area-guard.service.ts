import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AdminLoginDataService} from './login/admin-login-data.service';

@Injectable()
export class AdminProtectedAreaGuardService implements CanActivateChild {

  constructor(
    private adminDataLoginService: AdminLoginDataService,
    private router: Router,
  ) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const [urlSegment] = childRoute.url;
    if (urlSegment?.path === 'login') {
      return true;
    }
    if (this.adminDataLoginService.hasData) {
      return true;
    }
    return this.router.createUrlTree(['dashboard', 'login']);
  }
}
