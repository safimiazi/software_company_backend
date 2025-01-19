export interface TUser {
    email: string;
    password: string;
    needsPasswordChange: boolean;
    passwordChangeAt?: Date;
    role: 'superAdmin' | 'admin'| 'employee';
    status: 'active'| 'blocked';
    isDeleted: boolean;
}