import {
  Directive,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IUser } from '../../shared/data-access/user.model';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Genre } from '../data-access/genre';
import { AddGenreDialogComponent } from 'src/app/shared/ui/add-genre-dialog/add-genre-dialog.component';
import { Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AddGenreDialogModule } from '../../shared/ui/add-genre-dialog/add-genre-dialog.module';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'app-genre-dialog',
})
export class GenreDialogDirective implements OnChanges, OnDestroy {
  @Input() openDialog: boolean;
  @Input() allGenres: Genre[];
  @Input() userGenres: Genre[];
  @Input() user: string;
  @Output() dialogClosed = new EventEmitter();
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['openDialog'] && changes['openDialog'].currentValue === true) {
      const dialog = this.dialog.open(AddGenreDialogComponent, {
        width: '35rem',
        data: {
          genres: this.allGenres,
          selectedGenres: this.userGenres,
          user: this.user,
        },
      });
      dialog
        .afterClosed()
        .pipe(
          takeUntil(this.destroy$),
          tap(() => {
            this.dialogClosed.emit();
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

@NgModule({
  declarations: [GenreDialogDirective],
  exports: [GenreDialogDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    AddGenreDialogModule,
  ],
})
export class GenreDialogDirectiveModule {}
