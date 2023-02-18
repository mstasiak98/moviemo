import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/data-access/user.service';
import { IUserFirestore } from './shared/data-access/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'moviemo_frontend';

  public constructor() {}
}
