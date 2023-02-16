import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing.module';
import { NavbarComponent } from './navbar.component';
import { SearchModule } from '../search/search.module';
import { AuthStatusModule } from '../auth-status/auth-status.module';

@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [CommonModule, NavbarRoutingModule, SearchModule, AuthStatusModule],
})
export class NavbarModule {}
