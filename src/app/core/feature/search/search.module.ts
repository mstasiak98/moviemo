import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from '../../../app.module';
import { AutoFocusModule } from '../../directive/auto-focus/auto-focus.module';

@NgModule({
  declarations: [SearchComponent],
  exports: [SearchComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AutoFocusModule],
})
export class SearchModule {}
