
export interface IReview {
  studentId: string;
  courseId: string;

  rating: number;
  review: string;

  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
}
