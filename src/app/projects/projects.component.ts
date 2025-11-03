import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, DialogModule, ButtonModule, TooltipModule, AnimationDirective, TranslateModule, TechnologiesComponent]
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
        name: this.translate.instant('projects.abonOnline.name'),
        image: 'projects/street.webp',
        link: 'https://github.com/eliceoflmov72/abono-angular',
        description: this.translate.instant('projects.abonOnline.description'),
        active: false,
        private: false,
        technologies: ['angular', 'node', 'typescript', 'sass', 'github', 'leaflet']
      },
      {
        name: this.translate.instant('projects.mantenlo.name'),
        image: 'projects/mantenlo.png',
        link: '',
        description: this.translate.instant('projects.mantenlo.description'),
        active: false,
        private: true,
        technologies: ['angular', 'firebase', 'google-cloud', 'typescript', 'tailwind', 'css', 'github']
      },
      {
        name: this.translate.instant('projects.zemios.name'),
        image: 'projects/zemios.png',
        link: 'https://zemios.com/',
        description: this.translate.instant('projects.zemios.description'),
        active: true,
        private: false,
        technologies: ['angular', 'nestjs', 'typescript', 'sass', 'github']
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
    if (!project.link) {
      event.preventDefault();
      return;
    }
  }
}
