import { Component, Input } from '@angular/core';

import { AnimationDirective } from '../directives/animation.directive';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [AnimationDirective],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
  @Input() title: string = '';
}
