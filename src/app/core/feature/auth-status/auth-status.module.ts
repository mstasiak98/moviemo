import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStatusComponent } from './auth-status.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AuthStatusComponent],
  exports: [AuthStatusComponent],
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
})
export class AuthStatusModule {}
