import { types } from "node:util";

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Event {
    id: string;
    name: string;    
    description: string;
    startDate: string;
    endDate: string;
    imageUrl: string | null;
    isOnline: boolean;
    location: string | null;
    userId: string;
    categoryId: number;
}

export interface EventWithUserAndCategory extends Event {
    user: User;
    category: Category;
}

export interface Provinsi {
    id: string,
    name: string
}

export interface Kabupaten {
    id: string,
    province_id: string,
    name: string
}



