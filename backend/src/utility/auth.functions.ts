import { ValidationError } from "../lib/AppError";

const ROLE_TO_TABLE_MAP = {
  admin: 'admins',
} as const;

type Role = keyof typeof ROLE_TO_TABLE_MAP;
type TableName = typeof ROLE_TO_TABLE_MAP[Role];

export const findProperTable = (role: string) => {
  
  if (!(role in ROLE_TO_TABLE_MAP)) {
    throw new ValidationError(`Invalid role: ${role}`);
  }
      return ROLE_TO_TABLE_MAP[role as Role];
  }