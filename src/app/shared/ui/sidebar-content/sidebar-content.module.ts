import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarContentRoutingModule } from './sidebar-content-routing.module';
import { SidebarContentComponent } from './sidebar-content.component';

@NgModule({
  declarations: [SidebarContentComponent],
  exports: [SidebarContentComponent],
  imports: [CommonModule, SidebarContentRoutingModule],
})
export class SidebarContentModule {}
