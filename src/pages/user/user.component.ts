import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {infoToken} from '../login/login.component';
import {NotificationService} from '../../user/service/notification.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public username: string;

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.notificationService.startListener((msg) => this.showSnackBar(msg));
  }

  logout() {
    this.notificationService.stopListener();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUsername() {
    return infoToken.sub;
  }

  showSnackBar(msg: string) {
    this.snackBar.open(msg, 'OK', {
      duration: 20000
    });
  }
}
