export type Admin = {
    id: string; // Unique identifier for the admin
    name: string; // Admin's full name
    email: string; // Admin's email address
    phone: string; // Admin's phone number
    createdAt: Date; // Date the admin was added
    updatedAt?: Date; // Last updated date (optional)
    picture?: string; // URL of the admin's profile picture (optional)
};
