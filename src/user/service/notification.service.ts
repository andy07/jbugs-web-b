import {Injectable} from '@angular/core';
import {BackendService} from '../../assets/backend.service';
import {Observable} from 'rxjs';
import * as Stomp from 'stompjs';
import {infoToken} from '../../pages/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private backService: BackendService) { }

  private client: any;

  public startListener(callback) {
    const ws = new WebSocket('ws://127.0.0.1:15674/ws');
    this.client = Stomp.over(ws);
    const onConnect = () => {
      console.log('connected');
      this.client.subscribe(`/exchange/notifications/${infoToken.sub}`, (msg) => {
        callback(msg.body);
      });
    };
    const onError = () => {
      console.log('error');
    };
    this.client.connect('test', 'test', onConnect, onError, '/');
  }

  public stopListener() {
    this.client.disconnect();
  }

  public getAll(): Observable<any[]> {
    return this.backService.get(`/api/users/${infoToken.sub}/notifications`);
  }
}
