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

export type ScreeningDetail= {
    movie: {
        id: string;
        title: string;
        description: string | null;
        genre: Genre;
        duration: number;
        imagePath: string;
        featured: boolean;
    };
    screen: {
        theater: {
            name: string;
            id: string;
            location: string;
        };
        seats: {
            number: number;
            id: string;
            screenId: string;
            row: string;
            type: string;
        }[];
    } & {
        name: string;
        id: string;
        theaterId: string;
    };
} & {
    id: string;
    startTime: Date;
    movieId: string;
    screenId: string;
}