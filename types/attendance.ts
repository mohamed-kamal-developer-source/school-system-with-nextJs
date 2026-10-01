import { AttendanceStatus } from './enums';

export type Attendance = {
  id: number,
  student_id: number,
  class_id: number,
  attendance_date: string,
  recorded_by: number,
  status: AttendanceStatus,
  active: boolean,
  created_at: string,
  updated_at: string,
}
