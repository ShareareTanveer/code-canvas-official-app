export interface ICreatePermission {
  entity_name: string;
  name: string;
  codename: string;
}

export interface IUpdatePermission {
  entity_name?: string;
  name?: string;
  codename?: string;
}