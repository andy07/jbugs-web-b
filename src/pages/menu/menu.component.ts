import {Component, OnInit} from '@angular/core';
import {
  returnUserPermissionForBugManagement,
  returnUserPermissionForPermissionManagement,
  returnUserPermissionForUserManagement
} from '../login/token';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  getPermissionForUserManagement(): boolean {
    return returnUserPermissionForUserManagement();
  }

  getPermissionForPermissionManagement(): boolean {
    return returnUserPermissionForPermissionManagement();
  }

  getPermissionForBugManagement(): boolean {
    return returnUserPermissionForBugManagement();
  }

}
