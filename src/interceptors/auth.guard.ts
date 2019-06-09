import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../user/service/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild {

  constructor(private userService:UserService, private router:Router){

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):  | boolean {
    return this.checkAuth();

  }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth();
  }
  private checkAuth() {
    if(this.userService.loggedIn()){
      console.log(this.userService.loggedIn());
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
