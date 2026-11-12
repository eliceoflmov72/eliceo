import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';

import { Project } from '../shared/interfaces/project.interface';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AnimationDirective } from '../shared/directives/animation.directive';
import { AnimationService } from '../shared/services/animation.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TechnologiesComponent } from '../shared/technologies/technologies.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: true,
  imports: [DialogModule, ButtonModule, TooltipModule, AnimationDirective, TranslateModule, TechnologiesComponent]
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  displayModal: boolean = false;
  private scrollbarWidth: number = 0;
  private langChangeSubscription: Subscription;

  constructor(
    private animationService: AnimationService,
    private translate: TranslateService
  ) {
    this.calculateScrollbarWidth();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadProjects();
    });
  }

  ngOnInit() {
    this.loadProjects();
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  private loadProjects() {
    this.projects = [
      {
        name: this.translate.instant('projects.minerva.name'),
        image: 'projects/minerva.jpg',
        link: 'https://minerva.zemios.net',
        description: this.translate.instant('projects.minerva.description'),
        summary: this.translate.instant('projects.minerva.summary'),
        category: this.translate.instant('projects.minerva.category'),
        active: true,
        private: false,
        technologies: ['angular', 'nestjs', 'python', 'typescript', 'tailwind', 'mongodb']
      },
      {
        name: this.translate.instant('projects.fleets.name'),
        image: 'projects/fleets.jpg',
        link: 'https://fleets-demo.zemios.net',
        description: this.translate.instant('projects.fleets.description'),
        summary: this.translate.instant('projects.fleets.summary'),
        category: this.translate.instant('projects.fleets.category'),
        active: true,
        private: false,
        technologies: ['angular', 'nestjs', 'python', 'typescript', 'mongodb', 'docker']
      },
      {
        name: this.translate.instant('projects.zemios.name'),
        image: 'projects/zemios.png',
        link: 'https://zemios.com/',
        description: this.translate.instant('projects.zemios.description'),
        summary: this.translate.instant('projects.zemios.summary'),
        category: this.translate.instant('projects.zemios.category'),
        active: true,
        private: false,
        technologies: ['angular', 'nestjs', 'python', 'typescript', 'sass', 'github']
      },
      {
        name: this.translate.instant('projects.abonOnline.name'),
        image: 'projects/street.webp',
        link: 'https://github.com/eliceoflmov72/abono-angular',
        description: this.translate.instant('projects.abonOnline.description'),
        summary: this.translate.instant('projects.abonOnline.summary'),
        category: this.translate.instant('projects.abonOnline.category'),
        active: false,
        private: false,
        technologies: ['angular', 'node', 'typescript', 'sass', 'github', 'leaflet']
      },
      {
        name: this.translate.instant('projects.mantenlo.name'),
        image: 'projects/mantenlo.png',
        link: '',
        description: this.translate.instant('projects.mantenlo.description'),
        summary: this.translate.instant('projects.mantenlo.summary'),
        category: this.translate.instant('projects.mantenlo.category'),
        active: false,
        private: true,
        technologies: ['angular', 'firebase', 'google-cloud', 'typescript', 'tailwind', 'css', 'github']
      }
    ];
  }

  private calculateScrollbarWidth(): void {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    this.scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode?.removeChild(outer);
  }

  toggleActive(project: Project): void {
    this.selectedProject = project;
    this.displayModal = true;
    this.handleModalOpen();
  }

  closeDetails(): void {
    this.displayModal = false;
    this.selectedProject = null;
    this.handleModalClose();
  }

  private handleModalOpen(): void {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${this.scrollbarWidth}px`;
  }

  private handleModalClose(): void {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  @HostListener('window:resize')
  onResize(): void {
    this.calculateScrollbarWidth();
  }

  handleLinkClick(event: Event, project: Project): void {
    if (!project.link || project.private) {
      event.preventDefault();
    }
  }

  handleCardKeydown(event: KeyboardEvent, project: Project): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleActive(project);
    }
  }

  getStatusKey(project: Project): string {
    if (project.private) {
      return 'projects.status.private';
    }
    return project.active ? 'projects.status.active' : 'projects.status.inactive';
  }

  getStatusClass(project: Project): string {
    if (project.private) {
      return 'status-badge status-badge--private';
    }
    return project.active ? 'status-badge status-badge--active' : 'status-badge status-badge--inactive';
  }

  getActionKey(project: Project): string {
    if (project.private) {
      return 'projects.actions.private';
    }
    if (!project.link) {
      return 'projects.actions.noLink';
    }
    return project.active ? 'projects.actions.open' : 'projects.actions.inactive';
  }
}
