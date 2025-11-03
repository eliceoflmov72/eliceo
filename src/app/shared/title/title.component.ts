import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationDirective } from '../directives/animation.directive';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule, AnimationDirective],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
  @Input() title: string = '';
}
