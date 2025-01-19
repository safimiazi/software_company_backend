export type TAdmin = {
    name: string; // Admin's full name
    
    email: string;
    password: string;
    needsPasswordChange: boolean;
    passwordChangeAt?: Date;
    role: 'superAdmin' | 'admin'| 'employee';
    status: 'active'| 'blocked';
    isDeleted: boolean;
    
    phone?: string; // Optional phone number
    picture?: string; // Optional profile picture URL
    createdAt?: Date; // Creation date (optional, auto-generated)
    updatedAt?: Date; // Update date (optional, auto-generated)
  
  
  };
  