import { Component } from '@angular/core';

import { AnimationDirective } from '../shared/directives/animation.directive';
import { AnimationService } from '../shared/services/animation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-studies',
  standalone: true,
  imports: [AnimationDirective, TranslateModule],
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent {
  studies = [
    {
      key: 'webDev',
      moreInfoLink: 'https://www.educa.jccm.es/es/fpclm/ciclos-formativos-1/tecnico-superior-desarrollo-aplicaciones-web'
    },
    {
      key: 'aiBigData',
      moreInfoLink: 'https://www.educa.jccm.es/es/fpclm/cursos-especializacion/curso-especializacion-inteligencia-artificial-big-data'
    }
  ];

  constructor(
    private animationService: AnimationService,
    public translate: TranslateService
  ) { }
}
