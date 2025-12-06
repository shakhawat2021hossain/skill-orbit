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