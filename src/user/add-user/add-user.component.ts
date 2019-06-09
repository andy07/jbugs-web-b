import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestUser} from '../models/restUser';
import {UserService} from '../service/user.service';
import {EnumRole, RestRole} from '../../role/models/restRole';
import {RoleService} from '../../role/service/role.service';
import {PopUpMessageComponent} from '../../pages/login/login.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public roleList: RestRole[];


  public user: RestUser = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    roles: []
  };

  /*{firstName: '', lastName: '', email: '', mobileNumber: '', roles:null};*/


  constructor(private roleService: RoleService, private userService: UserService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {

    this.roleService.getAllRoles().subscribe((roleList) => {
      // roleList.forEach(s => {
      //   s.type = RoleConverter.backEndToFrontEnd(s.type);
      // });
      this.roleList = roleList;
    },
      error =>{
        this.router.navigate(['/home/error'],{queryParams:{message:error.error}})});
  }

  public onSubmit() {


    // console.log(this.user.roles);
    //
    // for(let i=0;i<this.user.roles.length;i++){
    //     this.user.roles[i]=RoleConverter.frontEndToBackEnd(this.user.roles[i]);
    // }
    // console.log(this.user.roles);

    this.userService.save(this.user).subscribe(
      (user) => {
        this.user = user
        this.redirectToUserList()
      },
      (error) => {
        this.dialog.open(PopUpMessageComponent, {width: '500px', height: '100px', data: {data: error.error.message}});
      },
      () => {
        this.redirectToUserList();
      }
    );

  }

  private redirectToUserList() {
    this.router.navigate(['home/users/user-list']);
  }

  getEnumName(type: string): string {
    return EnumRole[type];
  }


}
