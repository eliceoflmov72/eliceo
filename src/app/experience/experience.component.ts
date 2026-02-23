import { Component, OnInit, OnDestroy } from '@angular/core';

import { TechnologiesComponent } from '../shared/technologies/technologies.component';
import { AnimationDirective } from '../shared/directives/animation.directive';
import { AnimationService } from '../shared/services/animation.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Renderer2 } from '@angular/core';
import { CloseOnScrollDirective } from '../shared/directives/close-on-scroll.directive';

interface Experience {
  title: string;
  position: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  color: string;
  isDark: boolean;
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
    private renderer: Renderer2,
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
    this.clearBackground();
  }

  private clearBackground() {
    this.renderer.setStyle(document.body, 'background-image', 'none');
    this.renderer.removeStyle(document.body, 'background-size');
    this.renderer.removeStyle(document.body, 'background-position');
    this.renderer.removeStyle(document.body, 'background-attachment');
    this.renderer.removeStyle(document.body, 'background-repeat');
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
      },
    ];
  }

  toggleExperience(index: number | null) {
    if (index === null || this.expandedIndex === index) {
      this.expandedIndex = null;
      this.clearBackground();
    } else {
      this.expandedIndex = index;
      const experience = this.experiences[index];
      this.setBackground(experience.imageUrl, experience.isDark);
    }
  }

  private setBackground(imageUrl: string, isDark: boolean) {
    const overlay = isDark
      ? 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))'
      : 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))';

    this.renderer.setStyle(
      document.body,
      'background-image',
      `${overlay}, url(${imageUrl})`,
    );
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-position', 'center');
    this.renderer.setStyle(document.body, 'background-attachment', 'fixed');
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
  }
}
