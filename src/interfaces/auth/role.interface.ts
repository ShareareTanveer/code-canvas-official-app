import { ISimpleUserResponse } from 'user/user.interface';
import { IPermissionResponse } from './permission.interface';

export interface ISimpleRoleResponse {
  id: number;
  name: string;
}

export interface IRoleResponse {
  id: number;
  name: string;
  permissions: IPermissionResponse[];
  users: ISimpleUserResponse[];
}

export interface ICreateRole {
  name: string;
  users?: number[];
  permissions?: number[];
}

export interface IUpdateRole {
  name?: string;
  users?: number[];
  permissions?: number[];
}
