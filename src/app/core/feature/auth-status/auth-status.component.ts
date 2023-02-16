import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser, googleLogin, logout } from '../../../state/user/user.actions';
import { selectUserData } from '../../../state/user/user.selector';
import { MatDialog } from '@angular/material/dialog';
import { AddGenreDialogComponent } from '../../../shared/ui/add-genre-dialog/add-genre-dialog.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrls: ['./auth-status.component.scss'],
})
export class AuthStatusComponent implements OnInit {
  isSignedIn: boolean = false;
  authenticatedUser$ = this.store.select(selectUserData);
  constructor(private store: Store<any>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(getUser());
  }

  googleLogin() {
    this.dialog.open(LoginComponent, {
      width: '35rem',
    });
  }

  logout() {
    this.store.dispatch(logout());
  }
}
