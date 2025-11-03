import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationDirective } from '../shared/directives/animation.directive';
import { AnimationService } from '../shared/services/animation.service';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface StackItem {
  key: string;
  imageUrl: string;
  isFlipped: boolean;
}

interface StackType {
  key: string;
  items: StackItem[];
}

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule, AnimationDirective, TooltipModule, TranslateModule],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.css'
})
export class StackComponent implements OnInit {
  stackTypes: StackType[] = [
    {
      key: 'frontend',
      items: [
        { key: 'typescript', imageUrl: './technologies/typescript.png', isFlipped: false },
        { key: 'angular', imageUrl: './technologies/angular.webp', isFlipped: false },
        { key: 'material', imageUrl: './technologies/material.png', isFlipped: false },
        { key: 'primeng', imageUrl: './technologies/primeng.png', isFlipped: false },
        { key: 'react-native', imageUrl: './technologies/react-native.png', isFlipped: false },
        { key: 'tailwind', imageUrl: './technologies/tailwind.png', isFlipped: false },
        { key: 'bootstrap', imageUrl: './technologies/bootstrap.svg', isFlipped: false },
        { key: 'sass', imageUrl: './technologies/sass.png', isFlipped: false },
        { key: 'figma', imageUrl: './technologies/figma.png', isFlipped: false }
      ]
    },
    {
      key: 'backend',
      items: [
        { key: 'spring-boot', imageUrl: './technologies/spring-boot.png', isFlipped: false },
        { key: 'node', imageUrl: './technologies/node.webp', isFlipped: false },
        { key: 'nestjs', imageUrl: './technologies/nestjs.svg', isFlipped: false },
        { key: 'python', imageUrl: './technologies/python.png', isFlipped: false },
        { key: 'aws', imageUrl: './technologies/aws.png', isFlipped: false },
        { key: 'google-cloud', imageUrl: './technologies/google-cloud.webp', isFlipped: false },
        { key: 'firebase', imageUrl: './technologies/firebase.png', isFlipped: false },
        { key: 'docker', imageUrl: './technologies/docker.png', isFlipped: false }
      ]
    },
    {
      key: 'databases',
      items: [
        { key: 'mongodb', imageUrl: './technologies/mongodb.png', isFlipped: false },
        { key: 'mysql', imageUrl: './technologies/mysql.png', isFlipped: false },
        { key: 'postgresql', imageUrl: './technologies/postgre-sql.png', isFlipped: false },
        { key: 'neo4j', imageUrl: './technologies/neo4j.png', isFlipped: false },
        { key: 'sql', imageUrl: './technologies/sql.png', isFlipped: false }
      ]
    },
    {
      key: 'analysis',
      items: [
        { key: 'pandas', imageUrl: './technologies/pandas.png', isFlipped: false },
        { key: 'r', imageUrl: './technologies/r.png', isFlipped: false },
        { key: 'ggplot2', imageUrl: './technologies/ggplot2.png', isFlipped: false },
        { key: 'matplotlib', imageUrl: './technologies/matplotlib.png', isFlipped: false },
        { key: 'seaborn', imageUrl: './technologies/seaborn.png', isFlipped: false },
        { key: 'scikit-learn', imageUrl: './technologies/scikit-learn.png', isFlipped: false },
        { key: 'knime', imageUrl: './technologies/knime.png', isFlipped: false },
        { key: 'power-bi', imageUrl: './technologies/power-bi.png', isFlipped: false }
      ]
    },
    {
      key: 'management',
      items: [
        { key: 'git', imageUrl: './technologies/git.png', isFlipped: false },
        { key: 'github', imageUrl: './technologies/github.png', isFlipped: false },
        { key: 'clickup', imageUrl: './technologies/clickup.webp', isFlipped: false },
        { key: 'linear', imageUrl: './technologies/linear.svg', isFlipped: false },
        { key: 'notion', imageUrl: './technologies/notion.png', isFlipped: false },
        { key: 'slack', imageUrl: './technologies/slack.png', isFlipped: false },
        { key: 'n8n', imageUrl: './technologies/n8n.png', isFlipped: false },
        { key: 'pandorabots', imageUrl: './technologies/pandorabots.png', isFlipped: false }
      ]
    }
  ];

  activeTab: string = 'frontend';

  imageLoaded: { [key: string]: boolean } = {};

  private readonly filenameMap: { [key: string]: string } = {
    'react native'     : 'react-native',
    'spring-boot'      : 'spring-boot',
    'google-cloud'     : 'google-cloud',
    'postgresql'       : 'postgre-sql',
    'power-bi'         : 'power-bi',
    'google startups'  : 'google-startups',
    'microsoft add-ons': 'microsoft-add-ons'
  };

  // Extensiones especiales que necesitan ser especificadas
  private readonly specialExtensions: { [key: string]: string } = {
    angular:      '.webp',
    node:         '.webp',
    'google-cloud': '.webp',
    clickup:      '.webp',
    bootstrap:    '.svg',
    nestjs:       '.svg',
    linear:       '.svg'
  };

  // Extensión por defecto para el resto de tecnologías
  private readonly defaultExtension = '.png';

  getImagePath(tech: string): string {
    const key  = tech.toLowerCase();
    const slug = this.filenameMap[key] ?? key.replace(/\s+/g, '-');
    const ext  = this.specialExtensions[slug] ?? this.defaultExtension;
    return `./technologies/${slug}${ext}`;
  }

  constructor(
    private animationService: AnimationService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    // Inicializar todas las tecnologías como cargadas
    this.stackTypes.forEach(type => {
      type.items.forEach(item => {
        this.imageLoaded[item.key.toLowerCase()] = true;
      });
    });
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  toggleCard(event: MouseEvent) {
    const card = (event.currentTarget as HTMLElement).querySelector('.card-inner');
    const index = Array.from(card?.parentElement?.parentElement?.children || []).indexOf(card?.parentElement as HTMLElement);
    if (index !== -1) {
      const activeTab = this.stackTypes.find(type => type.key === this.activeTab);
      if (activeTab) {
        activeTab.items[index].isFlipped = !activeTab.items[index].isFlipped;
      }
    }
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    const tech = imgElement.alt;
    console.error(`Error loading image: ${imgElement.src}`);
    this.imageLoaded[tech.toLowerCase()] = false;
  }

  getTooltipText(key: string): string {
    return key.replace(/-/g, ' ').toUpperCase();
  }
}
