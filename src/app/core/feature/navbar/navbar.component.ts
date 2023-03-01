import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  hamburgerOpen: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  hamburgerToggle() {
    this.hamburgerOpen = !this.hamburgerOpen;
    this.document.body.classList.toggle('hide-y-overflow');
  }
}
