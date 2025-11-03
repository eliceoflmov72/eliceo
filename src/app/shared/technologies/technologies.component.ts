import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { TechnologiesAnimationService } from '../services/technologies-animation.service';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css', './technologies.animations.css']
})
export class TechnologiesComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() technologies: string[] = [];
  @Input() showBackground: boolean = false;
  @ViewChild('technologiesContainer') technologiesContainer!: ElementRef;
  imageLoaded: { [key: string]: boolean } = {};
  isVisible = false;

  // Extensiones especiales que necesitan ser especificadas
  private readonly specialExtensions: { [key: string]: string } = {
    'angular': '.webp',
    'node': '.webp',
    'google-cloud': '.webp',
    'bootstrap': '.svg',
    'nestjs': '.svg',
    'clickup': '.webp'
  };

  // Extensión por defecto para el resto de tecnologías
  private readonly defaultExtension = '.png';

  constructor(private technologiesAnimation: TechnologiesAnimationService) {}

  ngOnInit() {
    // Inicializar todas las tecnologías como cargadas
    this.technologies.forEach(tech => {
      this.imageLoaded[tech] = true;
    });
  }

  ngAfterViewInit() {
    if (this.technologiesContainer) {
      this.technologiesAnimation.observeTechnologies(
        this.technologiesContainer.nativeElement
      ).subscribe(isVisible => {
        this.isVisible = isVisible;
      });
    }
  }

  ngOnDestroy() {
    // El servicio se encargará de limpiar los recursos
  }

  getImagePath(tech: string): string {
    // Si la tecnología tiene una extensión especial, la usamos
    const extension = this.specialExtensions[tech] || this.defaultExtension;
    return `./technologies/${tech}${extension}`;
  }
}
