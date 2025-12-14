import z from "zod";



export interface ILesson {
    _id: string;
    title: string;
    videoUrl?: string;
    duration?: number;
    courseId: string;
}





export enum Category {
    WEB_DEVELOPMENT = "Web Development",
    PROGRAMMING = "Programming",
    DATA_SCIENCE = "Data Science",
    MACHINE_LEARNING = "Machine Learning",
    DEVOPS = "DevOps",
    CLOUD = "Cloud",
    MOBILE = "Mobile Development",
    CYBER_SECURITY = "Cyber Security",
    UI_UX = "UI/UX Design"
}
export type TResource = {
    title: string;
    link: string;
}
export interface ICourse {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: Category;
    instructor: string;
    introVideo?: string;
    resources?: TResource[]

    thumbnail?: string;
    tags?: string[];
    syllabus?: ILesson[];
    totalDuration?: number;
    createdBy: string;
    students?: string[];
    rating?: string;
}

export const courseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be a positive number"),
    category: z.nativeEnum(Category),
    instructor: z.string().min(1, "Instructor is required")
});


export type CourseFormData = z.infer<typeof courseSchema>;



export interface IEnrollment {
    _id: string;
    studentId: string;
    courseId: string | ICourse;
    progress: number;
    paymentStatus: "PAID" | "UNPAID";
    completedLessons: string[];
    createdAt: string;
    updatedAt: string;
}

export interface IMyCourseDetails {
    enrollment: IEnrollment;
    course: ICourse;
}
