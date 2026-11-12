import { Component, OnInit, OnDestroy } from '@angular/core';

import { TechnologiesComponent } from '../shared/technologies/technologies.component';
import { AnimationDirective } from '../shared/directives/animation.directive';
import { AnimationService } from '../shared/services/animation.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CloseOnScrollDirective } from '../shared/directives/close-on-scroll.directive';

interface Experience {
  title: string;
  position: string;
  date: string;
  description: string;
  imageUrl: string;
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    TechnologiesComponent,
    AnimationDirective,
    TranslateModule,
    CloseOnScrollDirective,
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent implements OnInit, OnDestroy {
  expandedIndex: number | null = null;
  experiences: Experience[] = [];
  private langChangeSubscription: Subscription;

  constructor(
    private animationService: AnimationService,
    private translate: TranslateService,
  ) {
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadExperiences();
    });
  }

  ngOnInit() {
    this.loadExperiences();
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  private loadExperiences() {
    this.experiences = [
      {
        title: this.translate.instant('experience.corvus.title'),
        position: this.translate.instant('experience.corvus.position'),
        date: this.translate.instant('experience.corvus.date'),
        description: this.translate.instant('experience.corvus.description'),
        imageUrl: '/experiences/corvus.svg',
        technologies: [
          'angular',
          'nestjs',
          'python',
          'power-bi',
          'mongodb',
          'mysql',
          'docker',
          'aws',
          'github',
          'clickup',
        ],
      },
      {
        title: this.translate.instant('experience.zemios.title'),
        position: this.translate.instant('experience.zemios.position'),
        date: this.translate.instant('experience.zemios.date'),
        description: this.translate.instant('experience.zemios.description'),
        imageUrl: '/experiences/zemios.svg',
        technologies: [
          'angular',
          'nestjs',
          'node',
          'python',
          'pandas',
          'mysql',
          'mongodb',
          'docker',
          'aws',
          'google-cloud',
          'github',
          'clickup',
        ],
      },
      {
        title: this.translate.instant('experience.zepo.title'),
        position: this.translate.instant('experience.zepo.position'),
        date: this.translate.instant('experience.zepo.date'),
        description: this.translate.instant('experience.zepo.description'),
        imageUrl: '/experiences/experience1.webp',
        technologies: [
          'google-startups',
          'microsoft-add-ons',
          'angular',
          'spring-boot',
          'django',
          'mongodb',
          'mysql',
          'grapesjs',
          'docker',
          'github',
          'clickup',
          'sass',
        ],
      },
      {
        title: this.translate.instant('experience.dialogo.title'),
        position: this.translate.instant('experience.dialogo.position'),
        date: this.translate.instant('experience.dialogo.date'),
        description: this.translate.instant('experience.dialogo.description'),
        imageUrl: '/experiences/experience2.png',
        technologies: [
          'angular',
          'spring-boot',
          'docker',
          'mongodb',
          'github',
          'gitea',
          'sass',
        ],
      },
    ];
  }

  toggleExperience(index: number | null) {
    if (index === null || this.expandedIndex === index) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = index;
    }
  }

  handleCardKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleExperience(index);
    }
  }
}
