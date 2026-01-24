export type UserData={
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    imagePath: string;
    isVerified: boolean;
}

type Genre =  'PENDING_PAYMENT' | 'CONFIRMED' | 'CANCELLED' | 'FAILED'

export type Movies= {
    id: string;
    title: string;
    description: string | null;
    genre: Genre;
    duration: number;
    imagePath: string;
    featured: boolean;
}