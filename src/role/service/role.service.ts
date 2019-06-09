import {Injectable} from '@angular/core';
import {BackendService} from "../../assets/backend.service";
import {Observable} from "rxjs";
import {RestRole} from "../models/restRole";
import {RestBug} from "../../bug/models/restBug";
import {RestPermission} from "../models/restPermission";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private backendService: BackendService) {
  }


  public getAllRoles(): Observable<RestRole[]> {
    return this.backendService.get('/api/roles');
  }

  public getRoleByType(type: string): Observable<RestRole> {
    return this.backendService.post('/api/roles/type',type);
  }

  public update(role: RestRole): Observable<RestRole> {
    return this.backendService.put('/api/roles', role);
  }

  public getAllPermissions(): Observable<RestPermission[]> {
    return this.backendService.get('/api/permissions');
  }


}
