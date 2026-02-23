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
  description: string;
  imageUrl: string;
  technologies: string[];
  color: string;
  isDark: boolean;
  tintIntensity: string;
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
        title: this.translate.instant('experience.zepo.title'),
        position: this.translate.instant('experience.zepo.position'),
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
        color: '#000837',
        isDark: true,
        tintIntensity: '30%',
      },
      {
        title: this.translate.instant('experience.dialogo.title'),
        position: this.translate.instant('experience.dialogo.position'),
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
        color: '#AEC634',
        isDark: false,
        tintIntensity: '12%',
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
}
