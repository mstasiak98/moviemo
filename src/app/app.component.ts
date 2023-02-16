import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/data-access/user.service';
import { IUserFirestore } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'moviemo_frontend';
  /*
  userGenres$ = this.userService.currentUserData$;
*/
  asd: number = 2;

  public constructor(private userService: UserService) {}
}
