export type Role = "USER" | "MODERATOR" | "ADMIN";

export type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCK";

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string | null;
  role: Role;
  phone?: string | null;
  picture?: string | null;
  status: UserStatus;
  isVerified: boolean;
  posts?: Post[];
  projects?: Project[];
  createdAt: Date;
  updatedAt: Date;
}
export interface Post {
  id: number;
  title: string;
  content: string;
  thumbnail?: string | null;
  isFeatured: boolean;
  tags: string[];
  views: number;
  authorId: number;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: number;
  title: string;
  thumbnail?: string | null;
  projectLinks: string[];
  liveSite?: string | null;
  description: string;
  features: string[];
  techStack: string[];
  views: number;
  isFeatured: boolean;
  authorId: number;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}