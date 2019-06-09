import {Injectable} from '@angular/core';
import {BackendService} from '../../assets/backend.service';
import {Observable} from 'rxjs';
import {RestUser} from '../models/restUser';
import {Token} from '../../pages/login/token';
import {RestBug} from '../../bug/models/restBug';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private backendService: BackendService) {
  }

  public getAllUsers(): Observable<RestUser[]> {
    return this.backendService.get('/api/users');
  }

  public save(user: RestUser): Observable<RestUser> {
    console.log(user);
    return this.backendService.post('/api/users', user);
  }

  public loginUser(username: string, password: string): Observable<Token> {
    return this.backendService.post('/api/users/login', {username, password});
  }

  public loggedIn(): boolean {
    if (localStorage.getItem('token') === null) {
      return false;
    } else {
      return true;
    }
  }
  public update(user: RestUser): Observable<RestBug> {
    return this.backendService.put(`/api/users/${user.username}`, user);
  }

  public getUserByUsername(username: string): Observable<RestUser> {
    return this.backendService.get(`/api/users/${username}`);
  }

  public updateUserStatus(username: string, status: boolean): Observable<any> {
    return this.backendService.post('/api/users/update-user-status', {username, status});
  }

  public getUsernames(): Observable<string[]> {
    return this.backendService.get('/api/users/usernames/all');
  }

}
