import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  debounce,
  distinctUntilChanged,
  Subject,
  Subscription,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
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
  @Input() isMobile: boolean = false;
  @Output() closeDropdown = new EventEmitter();
  readonly IMG_URL = environment.theMovieDbImgUrl;
  inputExpanded: boolean = false;

  searchForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
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
    this.searchForm.valueChanges
      .pipe(
        debounce(() => timer(600)),
        takeUntil(this.destroy$)
      )
      .subscribe((data: { keyword: string }) => {
        if (!data.keyword || data.keyword.trim().length === 0) return;
        this.store.dispatch(
          loadSnippedMoviesByKeyword({ keyword: data.keyword, page: 1 })
        );
      });

    this.store
      .select(selectCurrentKeyword)
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        // reset input field when store state changes
        if (!val) {
          this.searchForm.patchValue({ keyword: val });
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  navigateToMore() {
    this.inputExpanded = !this.inputExpanded;
    this.closeDropdown.emit();
    this.router.navigate(['movies', 'list'], {
      queryParams: {
        keyword: encodeURI(this.searchForm.get('keyword')?.value),
      },
    });
  }

  get f() {
    return this.searchForm.controls;
  }
}
