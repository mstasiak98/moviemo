import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarContentRoutingModule } from './sidebar-content-routing.module';
import { SidebarContentComponent } from './sidebar-content.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AddGenreDialogComponent } from '../add-genre-dialog/add-genre-dialog.component';
import { AddGenreDialogModule } from '../add-genre-dialog/add-genre-dialog.module';

@NgModule({
  declarations: [SidebarContentComponent],
  exports: [SidebarContentComponent],
  imports: [
    CommonModule,
    SidebarContentRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    AddGenreDialogModule,
  ],
})
export class SidebarContentModule {}
