import { User } from './user.model';

export interface UpdateRequest {
    userId: number;
    fname: string;
    lname: string;
    email: string;
    street: string;
    housenr: number;
    zipCode: string;
    city: string;
    birthday: Date;
    phonenumber: string;
}

export interface UpdateResponse {
    user?: User;
    token?: string;
    expiresAt?: number;
}

