import { Movie } from '../../movies/data-access/movie';

export interface ApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface PaginationData {
  page: number;
  total_pages: number;
  total_results: number;
}
