import { Gender } from './enums';

export type Student = {
  id: number,
  name: string,
  email: string,
  age: number,
  gender: Gender,
  phone: string,
  parent_name: string,
  parent_phone: string,
  user_id: number,
  active: boolean,
  created_at: string,
  updated_at: string,
}
