import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieHomeRoutingModule } from './movie-home-routing.module';
import { MovieHomeComponent } from './movie-home.component';
import { SidebarContentModule } from '../../../shared/ui/sidebar-content/sidebar-content.module';
import { UserService } from '../../../shared/data-access/user.service';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../../environments/environment';

@NgModule({
  declarations: [MovieHomeComponent],
  imports: [CommonModule, MovieHomeRoutingModule, SidebarContentModule],
  providers: [],
})
export class MovieHomeModule {}
