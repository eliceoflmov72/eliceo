import { Component } from '@angular/core';

import { AnimationDirective } from '../shared/directives/animation.directive';
import { AnimationService } from '../shared/services/animation.service';
import { CloseOnScrollDirective } from '../shared/directives/close-on-scroll.directive';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface CertificationGroup {
  issuer: string;
  logo?: string;
  wideLogo?: boolean;
  icon?: string;
  items: { name: string; year: string }[];
}

@Component({
  selector: 'app-studies',
  standalone: true,
  imports: [AnimationDirective, TranslateModule, CloseOnScrollDirective],
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent {
  readonly linkedinCertificationsUrl = 'https://www.linkedin.com/in/eliceo-leon/details/certifications/';
  expandedIndex: number | null = null;

  studies = [
    {
      key: 'rpa',
      imageUrl: 'studies/rpa.svg',
      moreInfoLink: 'https://www.eoi.es/'
    },
    {
      key: 'aiBigData',
      imageUrl: 'studies/ai-bigdata.svg',
      moreInfoLink: 'https://www.educa.jccm.es/es/fpclm/cursos-especializacion/curso-especializacion-inteligencia-artificial-big-data'
    },
    {
      key: 'webDev',
      imageUrl: 'studies/webdev.svg',
      moreInfoLink: 'https://www.educa.jccm.es/es/fpclm/ciclos-formativos-1/tecnico-superior-desarrollo-aplicaciones-web'
    }
  ];

  readonly certificationGroups: CertificationGroup[] = [
    {
      issuer: 'MongoDB',
      logo: 'technologies/mongodb.png',
      items: [
        { name: 'MongoDB Schema Design Patterns and Anti-patterns', year: '2025' },
        { name: 'Building AI Agents with MongoDB', year: '2025' },
        { name: 'MongoDB Overview: Core Concepts and Architecture', year: '2025' },
        { name: 'MongoDB Introduction', year: '2025' }
      ]
    },
    {
      issuer: 'Neo4j',
      logo: 'technologies/neo4j.png',
      wideLogo: true,
      items: [
        { name: 'Neo4j Graph Data Science', year: '2024' },
        { name: 'Neo4j Professional', year: '2024' }
      ]
    },
    {
      issuer: 'Grupo LAE',
      icon: 'pi-shield',
      items: [
        { name: 'Experto en protección de datos', year: '2026' }
      ]
    }
  ];

  get totalCertifications(): number {
    return this.certificationGroups.reduce((total, group) => total + group.items.length, 0);
  }

  constructor(
    private animationService: AnimationService,
    public translate: TranslateService
  ) { }

  toggleStudy(index: number | null) {
    if (index === null || this.expandedIndex === index) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = index;
    }
  }

  handleCardKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleStudy(index);
    }
  }
}
