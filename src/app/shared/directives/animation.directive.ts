import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { AnimationService, AnimationOptions } from '../services/animation.service';

@Directive({
  selector: '[appAnimate]',
  standalone: true
})
export class AnimationDirective implements OnInit, OnDestroy {
  @Input() animationType: string = 'scale-in';
  @Input() animationOptions: AnimationOptions = {};
  @Input() elementId: string = '';
  private id!: string;

  constructor(
    private el: ElementRef,
    private animationService: AnimationService
  ) { }

  ngOnInit() {
    this.id = this.elementId || `anim-${crypto.randomUUID().slice(0, 8)}`;
    this.el.nativeElement.classList.add(this.animationType);
    this.animationService.observeElement(this.id, this.el.nativeElement, this.animationOptions);
  }
  ngOnDestroy() { this.animationService.disconnectObserver(this.id); }
} 