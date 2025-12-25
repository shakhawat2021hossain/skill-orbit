
export enum UserRole {
    ADMIN = "ADMIN",
    INSTRUCTOR= "INSTRUCTOR",
    STUDENT = "STUDENT",
}



export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    picture?: string;
    isDeleted?: boolean;
    address?: string;
    isBlocked?: boolean; 
    institute?:string
    createdAt: Date;
    wishlist?: string[]
}