import {RestPermission} from "./restPermission";


export interface RestRole {
  type: string;
  permissions: RestPermission[];
}

export enum EnumRole{
  ADM = "Administrator",
  PM = 'Project manager',
  TM = 'Test manager',
  DEV = 'Developer',
  TEST = 'Tester',
}


