export const roles = ["BUYER", "SELLER", "COURIER", "SUPPORT", "COMPLIANCE", "ADMIN", "SUPER_ADMIN"] as const;
export type Role = (typeof roles)[number];

export const permissionMatrix = {
  "order:read-own": ["BUYER", "SELLER", "COURIER", "SUPPORT", "ADMIN", "SUPER_ADMIN"],
  "catalog:manage-own": ["SELLER", "ADMIN", "SUPER_ADMIN"],
  "delivery:update-assigned": ["COURIER", "ADMIN", "SUPER_ADMIN"],
  "dispute:mediate": ["SUPPORT", "ADMIN", "SUPER_ADMIN"],
  "kyc:review": ["COMPLIANCE", "SUPER_ADMIN"],
  "financial-rule:propose": ["COMPLIANCE", "SUPER_ADMIN"],
  "financial-rule:approve": ["SUPER_ADMIN"],
} as const satisfies Record<string, readonly Role[]>;

export type Permission = keyof typeof permissionMatrix;
export const can = (role: Role, permission: Permission) => permissionMatrix[permission].includes(role as never);
