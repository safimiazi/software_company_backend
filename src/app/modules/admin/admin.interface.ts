export type TAdmin = {
    name: string; // Admin's full name
    email: string; // Admin's email address
    password: string; // Admin's password
    phone?: string; // Optional phone number
    picture?: string; // Optional profile picture URL
    createdAt?: Date; // Creation date (optional, auto-generated)
    updatedAt?: Date; // Update date (optional, auto-generated)
  };
  