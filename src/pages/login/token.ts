import {infoToken} from "./login.component";

export interface Token {
  token: string;
}

export interface infoTokenDecoded {
  sub: string;
  roles: string[];
  permissions: string[];
}

export function returnUserPermissionForBugManagement(): boolean {
  const allowedPermission: string = 'BUG_MANAGEMENT';
  let permission: boolean = false;
  infoToken.permissions.forEach(perm => {
    if (perm === allowedPermission)
      permission = true;
  })
  return permission;
}

export function returnUserPermissionForBugClose(): boolean {
  const allowedPermission: string = 'BUG_CLOSE';
  let permission: boolean = false;
  infoToken.permissions.forEach(perm => {
    if (perm === allowedPermission)
      permission = true;
  })
  return permission;
}

export function returnUserPermissionForBugExportPDF(): boolean {
  const allowedPermission: string = 'BUG_EXPORT_PDF';
  let permission: boolean = false;
  infoToken.permissions.forEach(perm => {
    if (perm === allowedPermission)
      permission = true;
  })
  return permission;
}


export function returnUserPermissionForUserManagement(): boolean {
  const allowedPermission: string = 'USER_MANAGEMENT';
  let permission: boolean = false;
  infoToken.permissions.forEach(perm => {
    if (perm === allowedPermission)
      permission = true;
  })
  return permission;
}

export function returnUserPermissionForPermissionManagement(): boolean {
  const allowedPermission: string = 'PERMISSION_MANAGEMENT';
  let permission: boolean = false;
  infoToken.permissions.forEach(perm => {
    if (perm === allowedPermission)
      permission = true;
  })
  return permission;
}

export function returnUserPermissionForNotifications(): boolean {
  const allowedPermission: string = 'USERUL_ADRESAT';
  let permission: boolean = false;
  infoToken.permissions.forEach(perm => {
    if (perm === allowedPermission)
      permission = true;
  })
  return permission;
}




