import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
  OnInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { fromEvent, throttleTime, Subscription } from 'rxjs';

import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TooltipModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('menuContainer') menuContainer!: ElementRef;

  menuItems = [
    'nav.home',
    'nav.experience',
    'nav.projects',
    'nav.studies',
    'nav.stack',
    'nav.contact',
  ];
  activeIndex = 0;
  isIconMode = false; // Modo iconos (scroll > 50px OR ancho < 500px)
  isCollapsed = true;
  slidingBackgroundLeft = 0;
  slidingBackgroundWidth = 0;
  private scrollSub!: Subscription;
  private resizeSub!: Subscription;
  private menuItemsElements: HTMLElement[] = [];
  private sectionTitles: HTMLElement[] = [];

  constructor(
    private translate: TranslateService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.updateMode(); // Inicializa modo iconos
    this.isCollapsed = this.isIconMode;
  }

  ngAfterViewInit() {
    this.initializeSectionTitles();
    this.cacheMenuItems();

    this.ngZone.runOutsideAngular(() => {
      this.scrollSub = fromEvent(window, 'scroll')
        .pipe(throttleTime(10, undefined, { leading: true, trailing: true }))
        .subscribe(() => this.onScrollInternal());

      this.resizeSub = fromEvent(window, 'resize')
        .pipe(throttleTime(100, undefined, { leading: true, trailing: true }))
        .subscribe(() => this.onResizeInternal());
    });

    requestAnimationFrame(() => {
      this.updateSlidingBackground();
      this.checkActiveSection();
      setTimeout(() => {
        this.updateSlidingBackground();
      }, 100);
    });
  }

  private initializeSectionTitles() {
    const selectors = [
      'app-about',
      'app-experience',
      'app-projects',
      'app-studies',
      'app-stack',
      'app-footer',
    ];
    this.sectionTitles = selectors
      .map((sel) => document.querySelector(sel) as HTMLElement)
      .filter((el) => !!el);
  }

  private cacheMenuItems() {
    this.menuItemsElements = Array.from(
      this.menuContainer.nativeElement.querySelectorAll('.menu-item'),
    ) as HTMLElement[];
  }

  getItemIcon(index: number): string {
    const icons = [
      'pi pi-home',
      'pi pi-briefcase',
      'pi pi-folder-open',
      'pi pi-book',
      'pi pi-th-large',
      'pi pi-envelope',
    ];
    return icons[index] || 'pi pi-circle';
  }

  setActive(index: number) {
    if (index < 0 || index >= this.menuItems.length) return;
    this.activeIndex = index;
    this.updateSlidingBackground();
    const section = this.sectionTitles[index];
    if (section) {
      window.scrollTo({
        top: this.getSectionOffset(section),
        behavior: 'smooth',
      });
    }
  }

  private updateSlidingBackground() {
    const active = this.menuItemsElements[this.activeIndex];
    const bg = this.menuContainer.nativeElement.querySelector(
      '.sliding-background',
    ) as HTMLElement;
    if (!active || !bg) return;

    this.slidingBackgroundLeft = active.offsetLeft;
    this.slidingBackgroundWidth = active.offsetWidth;

    // We only need to add the animate class, the [style] bindings in HTML handle the rest
    if (!bg.classList.contains('animate')) {
      requestAnimationFrame(() => bg.classList.add('animate'));
    }
  }

  private checkActiveSection() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    let bestVis = 0;
    let bestIdx = 0;

    this.sectionTitles.forEach((sec: HTMLElement, i: number) => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const vis =
        Math.max(0, Math.min(scrollY + vh, bottom) - Math.max(scrollY, top)) /
        sec.offsetHeight;
      if (vis > bestVis) {
        bestVis = vis;
        bestIdx = i;
      }
    });

    if (bestIdx !== this.activeIndex) {
      this.ngZone.run(() => {
        this.activeIndex = bestIdx;
        this.updateSlidingBackground();
        this.cdr.detectChanges();
      });
    }
  }

  private getSectionOffset(section: HTMLElement): number {
    const navbarH = 60;
    const prev = section.previousElementSibling as HTMLElement;
    return (
      (prev?.tagName === 'APP-TITLE' ? prev.offsetTop : section.offsetTop) -
      navbarH
    );
  }

  private updateMode() {
    this.isIconMode = window.scrollY > 50 || window.innerWidth < 500;
    this.isCollapsed = this.isIconMode;
  }

  private handleModeChange() {
    this.updateMode();
    this.ngZone.run(() => {
      // High frequency updates during the first 400ms of transition
      let start = performance.now();
      const update = () => {
        this.updateSlidingBackground();
        if (performance.now() - start < 450) {
          requestAnimationFrame(update);
        }
      };
      requestAnimationFrame(update);
    });
  }

  private onScrollInternal() {
    const now = window.scrollY > 50 || window.innerWidth < 500;
    if (this.isIconMode !== now) {
      this.ngZone.run(() => {
        this.handleModeChange();
        this.cdr.detectChanges();
      });
    }
    this.checkActiveSection();
  }

  @HostListener('window:scroll')
  onScroll() {
    // Empty, using RxJS listener for better performance
  }

  private onResizeInternal() {
    this.ngZone.run(() => {
      this.handleModeChange();
      this.updateSlidingBackground();
      this.cdr.detectChanges();
    });
  }

  @HostListener('window:resize')
  onResize() {
    // Empty, using RxJS listener
  }

  toggleNavbar() {
    if (!this.isIconMode) return;
    this.isCollapsed = !this.isCollapsed;
    this.ngZone.run(() => {
      setTimeout(() => this.updateSlidingBackground(), 300);
    });
  }

  ngOnDestroy() {
    if (this.scrollSub) this.scrollSub.unsubscribe();
    if (this.resizeSub) this.resizeSub.unsubscribe();
  }
}
