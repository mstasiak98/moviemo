import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounce, distinctUntilChanged, Subscription, tap, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadSnippedMoviesByKeyword } from '../../../state/movies/movies.actions';
import {
  selectCurrentKeyword,
  selectInputSearchStatus,
  selectMoviesState,
  selectMovieStatus,
  selectSnippedKeywordMovies,
} from '../../../state/movies/movies.selector';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  readonly IMG_URL = environment.theMovieDbImgUrl;
  inputExpanded: boolean = false;

  searchForm: FormGroup;
  formSubscription: Subscription;
  currentKeywordSub: Subscription;

  snippedOfMovies = this.store.select(selectSnippedKeywordMovies);
  searchingStatus = this.store.select(selectInputSearchStatus);

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      keyword: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.formSubscription = this.searchForm.valueChanges
      .pipe(debounce(() => timer(600)))
      .subscribe((data: { keyword: string }) => {
        if (!data.keyword || data.keyword.trim().length === 0) return;
        this.store.dispatch(
          loadSnippedMoviesByKeyword({ keyword: data.keyword, page: 1 })
        );
      });

    this.currentKeywordSub = this.store
      .select(selectCurrentKeyword)
      .subscribe((val) => {
        // reset input field when store state changes
        if (!val) {
          this.searchForm.patchValue({ keyword: val });
        }
      });
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
    this.currentKeywordSub.unsubscribe();
  }

  navigateToMore() {
    this.inputExpanded = !this.inputExpanded;
    this.router.navigate(['movies', 'search'], {
      queryParams: {
        keyword: encodeURI(this.searchForm.get('keyword')?.value),
      },
    });
  }

  get f() {
    return this.searchForm.controls;
  }
}
