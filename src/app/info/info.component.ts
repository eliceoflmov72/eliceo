// info.component.ts
import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TitleComponent } from '../shared/title/title.component';
import { AnimationDirective } from '../shared/directives/animation.directive';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [RouterLink, TranslateModule, TitleComponent, AnimationDirective],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent {
  constructor(public translate: TranslateService) {}
}
