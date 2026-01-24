export type UserData={
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    imagePath: string;
    isVerified: boolean;
}

type genre =  'PENDING_PAYMENT' | 'CONFIRMED' | 'CANCELLED' | 'FAILED'

export type Movies={
    id: string;
    title: string;
    description: string | null;
    genre: genre;
    duration: number;
}