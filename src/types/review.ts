
export interface IReview {
  _id: string;
  studentId: string;
  courseId: string;

  rating: number;
  review: string;
  reviewer: string;

  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
}
