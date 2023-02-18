import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../data-access/movie.service';
import { Store } from '@ngrx/store';
import {
  loadMovies,
  changeSortMode,
  setGenreFilter,
  setKeywordFilter,
  loadAllMovies,
  loadNowPlaying,
} from '../../../state/movies/movies.actions';
import {
  selectAllMovies,
  selectCurrentSortMode,
  selectPaginationData,
} from '../../../state/movies/movies.selector';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { sortModes } from '../../utils/sort-mode';
import { forkJoin, Subject, Subscription, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  moviesData$ = this.store.select(selectAllMovies);
  paginationData$ = this.store.select(selectPaginationData);
  sortModes = sortModes;
  currentSortMode$ = this.store.select(selectCurrentSortMode);
  isNowPlayingMode: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  queryParams = this.route.queryParamMap.pipe(
    tap((params) => {
      const page = params.get('p');
      if (params.has('genre')) {
        this.store.dispatch(
          setGenreFilter({ genreId: params.get('genre')!, page: 1 })
        );
      } else if (params.has('keyword')) {
        this.store.dispatch(
          setKeywordFilter({
            keyword: decodeURI(params.get('keyword')!),
            page: 1,
          })
        );
      } else if (params.has('type')) {
        this.store.dispatch(loadNowPlaying({ page: 1 }));
      } else {
        this.store.dispatch(loadAllMovies({ page: 1 }));
      }
    })
  );
  constructor(
    private movieDbService: MovieService,
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    /*    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params.has('genre')) {
          this.store.dispatch(
            setGenreFilter({ genreId: params.get('genre')!, page: 1 })
          );
        } else if (params.has('keyword')) {
          this.store.dispatch(
            setKeywordFilter({
              keyword: decodeURI(params.get('keyword')!),
              page: 1,
            })
          );
        } else if (params.has('type')) {
          this.store.dispatch(loadNowPlaying({ page: 1 }));
        } else {
          this.store.dispatch(loadAllMovies());
        }
      });*/

    console.log('init list', this.route.snapshot.queryParams);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /*  handleSearchAllMovies(): void {
    if (this.router.url === '/movies/list/all') {
      this.store.dispatch(loadAllMovies());
    }
  }*/

  /*  handleSearchPopular(): void {
    if (this.router.url === '/movies/list/now-playing') {
      this.store.dispatch(loadNowPlaying({ page: 1 }));
      this.isNowPlayingMode = true;
    }
  }

  handleSearchByGenre(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.store.dispatch(
          setGenreFilter({ genreId: params.get('id')!, page: 1 })
        );
      }
    });
  }*/

  handlePageChange($event: PageEvent) {
    const currentParam = this.route.snapshot.queryParamMap;
    if (!currentParam.has('type'))
      this.store.dispatch(loadMovies({ page: $event.pageIndex + 1 }));
    else this.store.dispatch(loadNowPlaying({ page: $event.pageIndex + 1 }));
  }

  changeSortMode($event: any) {
    this.store.dispatch(
      changeSortMode({ sortMode: $event.target.value, page: 1 })
    );
  }

  /*  handleSearchByKeyword(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (params.has('keyword')) {
        this.store.dispatch(
          setKeywordFilter({
            keyword: decodeURI(params.get('keyword')!),
            page: 1,
          })
        );
      }
    });
  }*/
}
