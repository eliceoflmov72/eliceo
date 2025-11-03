import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TechnologiesAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TechnologiesAnimationService implements OnDestroy {
  private defaultOptions: TechnologiesAnimationOptions = {
    threshold: 0.2,
    rootMargin: '-50px',
    delay: 100
  };

  private observer: IntersectionObserver | null = null;
  private animationState = new BehaviorSubject<boolean>(false);

  constructor() {}

  /**
   * Inicia la observación del contenedor de tecnologías
   * @param element Elemento HTML a observar
   * @param options Opciones de configuración del observador
   * @returns Observable que emite el estado de la animación
   */
  observeTechnologies(element: HTMLElement, options: TechnologiesAnimationOptions = {}): BehaviorSubject<boolean> {
    // Combinamos las opciones por defecto con las proporcionadas
    const finalOptions = { ...this.defaultOptions, ...options };
    
    // Creamos el observer si no existe
    if (!this.observer) {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          this.animationState.next(entry.isIntersecting);
        },
        {
          threshold: finalOptions.threshold,
          rootMargin: finalOptions.rootMargin
        }
      );
    }

    // Iniciamos la observación con un pequeño delay
    setTimeout(() => {
      this.observer?.observe(element);
    }, finalOptions.delay);

    return this.animationState;
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.animationState.complete();
  }
} 