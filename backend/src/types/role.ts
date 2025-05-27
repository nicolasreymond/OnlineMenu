export type Role = "admin" | "manager" | "staff" | "customer";

export interface RoleModel {
  id: number;
  name: Role;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
