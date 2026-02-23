import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appCloseOnScroll]',
  standalone: true,
})
export class CloseOnScrollDirective implements OnInit, OnDestroy {
  @Input('appCloseOnScroll') isExpanded: boolean = false;
  @Output() closeOnScroll = new EventEmitter<void>();

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setupObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupObserver() {
    const options = {
      root: null,
      threshold: 0, // Trigger when visibility drops below 0%
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the element is not intersecting and it was expanded, emit close event
        if (!entry.isIntersecting && this.isExpanded) {
          this.closeOnScroll.emit();
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }
}
