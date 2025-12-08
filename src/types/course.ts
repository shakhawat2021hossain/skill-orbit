import z from "zod";

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
    syllabus?: string[];
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
  instructor: z.string().min(1, "Instructor is required"),
//   tags: z.array(z.string()).default([]),
});
// export const courseSchema = z.object({
//     title: z.string().min(5),
//     description: z.string().min(20),
//     price: z.coerce.number().min(0),
//     category: z.nativeEnum(Category),
//     instructor: z.string().min(2),
//     tags: z.array(z.string()).default([]),
// });


export type CourseFormData = z.infer<typeof courseSchema>;
