import { Genre } from '../../shared/data-access/genre';

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  adult: boolean;
  backdrop_path: string | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: number;
  overview: string;
  popularity: number;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
}
