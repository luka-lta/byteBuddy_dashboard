export interface UserData {
    userId: string;
    email: string;
    username: string;
    role: string;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface LoginData {
    email: string;
    password: string;
}