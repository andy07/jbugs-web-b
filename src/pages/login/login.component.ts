import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../user/service/user.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {infoTokenDecoded} from './token';


function initializeInfoToken():infoTokenDecoded {
  let tokenEncoded : string  = localStorage.getItem('token');
  if(tokenEncoded !==null){
    const x = tokenEncoded.split('.');
    // decodific din baza 64 (atob)
    return  JSON.parse(atob(x[1]));
  }

}

export let infoToken: infoTokenDecoded = initializeInfoToken();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;

  constructor(private userService: UserService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  loginUser() {
    this.userService.loginUser(this.username, this.password).subscribe(
      (token) => {
        localStorage.setItem('token', token.token);
        infoToken = initializeInfoToken();
      },
      (error) => {
        this.dialog.open(PopUpMessageComponent, {width: '500px', height: '100px', data: {data: error.error.message}});
      },

      () => this.router.navigate(['/home'])
    );

  }


}

@Component({
  selector: 'app-pop-up-message',
  templateUrl: 'pop-up-message.component.html',
})
export class PopUpMessageComponent {
  public data;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) data: string) {
    this.data = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}





