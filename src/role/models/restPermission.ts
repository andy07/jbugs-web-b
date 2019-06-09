export interface RestPermission {
  type: string;
  description: string;
}

export enum EnumPermission{
  USER_MANAGEMENT,
  BUG_MANAGEMENT,
  BUG_CLOSE,
  BUG_EXPORT_PDF,
  USERUL_ADRESAT,
  PERMISSION_MANAGEMENT
}
