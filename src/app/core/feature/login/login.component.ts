import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { googleLogin } from '../../../state/user/user.actions';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  loginWithGoogle() {
    this.store.dispatch(googleLogin());
    this.dialogRef.close();
  }
}
