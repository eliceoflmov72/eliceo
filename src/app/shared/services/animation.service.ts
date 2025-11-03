import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AnimationOptions {
  enter?: number;      // ratio para MOSTRAR   (default .4)
  exit?:  number;      // ratio para OCULTAR   (default .1)
  rootMargin?: string; // margen opcional
  delay?: number;      // retardo ms
}

@Injectable({ providedIn: 'root' })
export class AnimationService implements OnDestroy {
  private defaults: Required<AnimationOptions> = {
    enter: .4,
    exit : .1,
    rootMargin: '-50px',
    delay: 50
  };

  private observers = new Map<string, IntersectionObserver>();
  private states    = new Map<string, BehaviorSubject<boolean>>();

  observeElement(id: string, el: HTMLElement, opts: AnimationOptions = {}) {
    this.disconnectObserver(id);                       // limpia antiguo
    const { enter, exit, rootMargin, delay } = { ...this.defaults, ...opts };

    const thresholds = Array.from({ length: 41 }, (_, i) => i / 40); // 0-1 cada 2.5 %

    const state$ = new BehaviorSubject(false);
    this.states.set(id, state$);

    const obs = new IntersectionObserver(
      ([entry]) => {
        const r   = entry.intersectionRatio;
        const vis = state$.value;

        if (!vis && r >= enter) { el.classList.add('visible');  state$.next(true);  }
        else if (vis && r <= exit) { el.classList.remove('visible'); state$.next(false); }
      },
      { threshold: thresholds, rootMargin }
    );

    this.observers.set(id, obs);
    setTimeout(() => obs.observe(el), delay);
    return state$;
  }

  disconnectObserver(id: string) {
    this.observers.get(id)?.disconnect();
    this.observers.delete(id);
    this.states.get(id)?.complete();
    this.states.delete(id);
  }
  disconnectAll(){ this.observers.forEach(o=>o.disconnect()); this.observers.clear(); this.states.forEach(s=>s.complete()); this.states.clear(); }
  ngOnDestroy(){ this.disconnectAll(); }
}
