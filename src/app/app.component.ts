import {Component} from '@angular/core';
import {infoToken} from '../pages/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
  }

  public isConnected() {
    return infoToken != null;
  }
}
