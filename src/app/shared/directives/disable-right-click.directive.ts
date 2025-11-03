import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[disableRightClick]'
})
export class DisableRightClickDirective {

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: Event): void {
    event.preventDefault();
  }
}