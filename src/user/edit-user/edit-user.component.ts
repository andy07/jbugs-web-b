import { Component, OnInit } from '@angular/core';
import {RestUser} from "../models/restUser";
import {NgModel} from "@angular/forms";
import {EnumRole, RestRole} from "../../role/models/restRole";
import {RoleService} from "../../role/service/role.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public roleList: RestRole[];

  public user: RestUser = {
    username:'',
    firstName:'',
    lastName:'',
    email:'',
    mobileNumber:'',
    password:'',
    roles:[]
  };

  constructor(private route: ActivatedRoute, private userService: UserService,
              private roleService : RoleService, private router: Router) { }

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    this.userService.getUserByUsername(username).subscribe((user) => {
      this.user = user;
    },
      error =>{
        this.router.navigate(['/home/error'],{queryParams:{message:error.error}})});

    this.roleService.getAllRoles().subscribe((roleList) => {
      this.roleList = roleList;
    });
  }

  public onSubmit() {
    console.log(this.user);
    this.userService.update(this.user).subscribe(data => {
      this.redirectToUserList();
    });
  }

  private redirectToUserList() {
    this.router.navigate(['home/users/user-list']);
  }

  getEnumName(type: string): string {
    return EnumRole[type];
  }


}
