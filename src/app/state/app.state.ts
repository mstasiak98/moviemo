import { MoviesState } from './movies/movies.reducer';
import { UserState } from './user/user.reducer';

export interface AppState {
  movies: MoviesState;
  user: UserState;
}
