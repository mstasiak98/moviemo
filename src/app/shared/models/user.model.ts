import { Genre } from '../data-access/genre';

export interface IUser {
  uid: string | null;
  displayName: string | null;
}

export interface IUserFirestore {
  uid: string;
  movie_genres: Genre[];
  tv_genres: Genre[];
}
