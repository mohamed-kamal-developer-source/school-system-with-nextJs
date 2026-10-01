export type Grade = {
  id: number,
  student_id: number,
  class_subject_id: number,
  exam_type: string,
  score: number,
  max_score: number,
  recorded_by: number,
  recorded_at: string,
  active: boolean,
  created_at: string,
  updated_at: string,
}
