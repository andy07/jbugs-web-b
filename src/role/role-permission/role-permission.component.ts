import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {RoleService} from "../service/role.service";
import {RestBug} from "../../bug/models/restBug";
import {EnumPermission, RestPermission} from "../models/restPermission";
import {Observable, ReplaySubject} from "rxjs";
import {BugStatus} from "../../bug/models/bugStatus.model";
import {BugService} from "../../bug/service/bug.service";
import {RestRole, EnumRole} from "../models/restRole";
import {FormControl} from "@angular/forms";
import {take, takeUntil} from "rxjs/operators";
import {MatDialog, MatSelect} from "@angular/material";
import {RestUser} from "../../user/models/restUser";
import {infoToken, PopUpMessageComponent} from "../../pages/login/login.component";
import {EnumValue} from "@angular/compiler-cli/src/ngtsc/metadata";
import {returnUserPermissionForPermissionManagement} from "../../pages/login/token";

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent implements OnInit {

  displayedColumns: string[] = ['type', 'permission'];
  public roleList: RestRole[];
  public permissionList: RestPermission[];

  @Output()
  public outputFromBackend = new EventEmitter<RestRole>();

  constructor(private roleService: RoleService, private router:Router,  public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if(this.verifyUserPermission()) {
      this.roleService.getAllPermissions().subscribe((permissionList) => {
        this.permissionList = permissionList;
      },
        error =>{
          this.router.navigate(['/home/error'],{queryParams:{message:error.error}})});
      this.roleService.getAllRoles().subscribe((roleList) => {
        this.roleList = roleList;
      },
        error =>{
          this.router.navigate(['/home/error'],{queryParams:{message:error.error}})});

    }
  }


  public onSubmit(role: RestRole) {

    this.roleService.update(role).subscribe(value => {},
      (error) => {
        this.dialog.open(PopUpMessageComponent, {width: '500px', height: '100px', data: {data: error.error.message}})});
    this.roleService.getAllRoles().subscribe((roleList) => {
      this.roleList = roleList;
    },
      error =>{
        this.dialog.open(PopUpMessageComponent, {width: '500px', height: '100px', data: {data: error.error.message}})});
  }

  compareWithFunc(a, b) {
    return a && b ? a.type === b.type : a === b;
  }

  getEnumName(type: string): string {
    return EnumRole[type];
  }

  verifyUserPermission(): boolean {
    return returnUserPermissionForPermissionManagement();
  }

}
