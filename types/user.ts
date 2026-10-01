import { UserRole } from './enums';

export type User = {
  id: number,
  name: string,
  email: string,
  password_hash: string,
  role: UserRole,
  active: boolean,
  created_at: string,
  updated_at: string,
}
