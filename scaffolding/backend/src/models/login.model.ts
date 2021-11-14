import { User } from './user.model';

export interface LoginResponse {
    user?: User;
    token?: string;
    expiresAt?: number;
    message?: string;
}

export interface LoginRequest {
    userName: string;
    password: string;
    email: string;
}
