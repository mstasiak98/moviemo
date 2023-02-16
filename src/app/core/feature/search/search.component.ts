import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounce, distinctUntilChanged, Subscription, tap, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadSnippedMoviesByKeyword } from '../../../state/movies/movies.actions';
import {
  selectInputSearchStatus,
  selectMoviesState,
  selectMovieStatus,
  selectSnippedKeywordMovies,
} from '../../../state/movies/movies.selector';
import { environment } from '../../../../environments/environment';

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

  snippedOfMovies = this.store.select(selectSnippedKeywordMovies);
  searchingStatus = this.store.select(selectInputSearchStatus);

  constructor(private fb: FormBuilder, private store: Store<any>) {
    this.searchForm = this.fb.group({
      keyword: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.formSubscription = this.searchForm.valueChanges
      .pipe(debounce(() => timer(600)))
      .subscribe((data: { keyword: string }) => {
        console.log('changed2=', data);
        if (!data.keyword || data.keyword.trim().length === 0) return;
        this.store.dispatch(
          loadSnippedMoviesByKeyword({ keyword: data.keyword, page: 1 })
        );
      });
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }
}
