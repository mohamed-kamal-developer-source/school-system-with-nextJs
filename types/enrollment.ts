import { EnrollmentStatus } from './enums';

export type Enrollment = {
  id: number,
  student_id: number,
  class_id: number,
  start_date: string,
  end_date: string,
  status: EnrollmentStatus,
  active: boolean,
  created_at: string,
  updated_at: string,
}
