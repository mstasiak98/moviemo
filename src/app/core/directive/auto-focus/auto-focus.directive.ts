import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private ref: ElementRef) {}

  ngAfterViewInit() {
    this.ref.nativeElement.focus();
  }
}
