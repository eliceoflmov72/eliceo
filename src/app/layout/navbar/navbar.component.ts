import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, OnInit, OnDestroy } from '@angular/core';

import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TooltipModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('menuContainer') menuContainer!: ElementRef;
  
  menuItems = ['nav.home', 'nav.experience', 'nav.projects', 'nav.studies', 'nav.stack', 'nav.contact'];
  activeIndex = 0;
  isIconMode = false;    // Modo iconos (scroll > 50px OR ancho < 500px)
  isCollapsed = true;
  slidingBackgroundLeft = 0;
  slidingBackgroundWidth = 0;
  private modeChangeTimeout!: any;
  private sectionTitles: HTMLElement[] = [];
  
  constructor(private translate: TranslateService) {}
  
  ngOnInit() {
    this.updateMode();    // Inicializa modo iconos
    this.isCollapsed = this.isIconMode;
  }
  
  ngAfterViewInit() {
    this.initializeSectionTitles();
    requestAnimationFrame(() => {
      this.updateSlidingBackground();
      this.updateIndicatorPosition();
      this.checkActiveSection();
      setTimeout(() => {
        this.updateIndicatorPosition();
        this.updateSlidingBackground();
      }, 100);
    });
  }
  
  private initializeSectionTitles() {
    this.sectionTitles = [
      'app-about', 'app-experience', 'app-projects',
      'app-studies', 'app-stack', 'app-footer'
    ]
    .map(sel => document.querySelector(sel) as HTMLElement)
    .filter(el => !!el);
  }
  
  getItemIcon(index: number): string {
    const icons = ['pi pi-home','pi pi-briefcase','pi pi-folder-open','pi pi-book','pi pi-th-large','pi pi-envelope'];
    return icons[index] || 'pi pi-circle';
  }
  
  setActive(index: number) {
    if (index < 0 || index >= this.menuItems.length) return;
    this.activeIndex = index;
    this.updateSlidingBackground();
    this.updateIndicatorPosition();
    const section = this.sectionTitles[index];
    if (section) {
      window.scrollTo({ top: this.getSectionOffset(section), behavior: 'smooth' });
    }
  }

  private updateSlidingBackground() {
    const items = document.querySelectorAll('.menu-item');
    const active = items[this.activeIndex] as HTMLElement;
    const bg = document.querySelector('.sliding-background') as HTMLElement;
    if (!active || !bg) return;
    const containerRect = this.menuContainer.nativeElement.getBoundingClientRect();
    const itemRect = active.getBoundingClientRect();
    this.slidingBackgroundLeft = itemRect.left - containerRect.left;
    this.slidingBackgroundWidth = this.isIconMode ? 40 : itemRect.width;
    bg.style.left = `${this.slidingBackgroundLeft}px`;
    bg.style.width = `${this.slidingBackgroundWidth}px`;
    bg.offsetHeight;
    requestAnimationFrame(() => bg.classList.add('animate'));
  }
  
  private updateIndicatorPosition() {
    const ind = document.querySelector('.menu-center-indicator') as HTMLElement;
    const items = document.querySelectorAll('.menu-item');
    const active = items[this.activeIndex] as HTMLElement;
    if (!ind || !active) return;
    const containerRect = this.menuContainer.nativeElement.getBoundingClientRect();
    const itemRect = active.getBoundingClientRect();
    ind.style.left = `${itemRect.left - containerRect.left}px`;
    ind.offsetHeight;
  }
  
  private checkActiveSection() {
    const scrollY = window.scrollY, vh = window.innerHeight;
    let bestVis = 0, bestIdx = 0;
    this.sectionTitles.forEach((sec, i) => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const vis = Math.max(0, Math.min(scrollY + vh, bottom) - Math.max(scrollY, top)) / sec.offsetHeight;
      if (vis > bestVis) { bestVis = vis; bestIdx = i; }
    });
    if (bestIdx !== this.activeIndex) {
      this.activeIndex = bestIdx;
      this.updateSlidingBackground();
      this.updateIndicatorPosition();
    }
  }
  
  private getSectionOffset(section: HTMLElement): number {
    const navbarH = 60;
    const prev = section.previousElementSibling as HTMLElement;
    return ((prev?.tagName === 'APP-TITLE' ? prev.offsetTop : section.offsetTop) - navbarH);
  }
  
  private updateMode() {
    this.isIconMode = window.scrollY > 50 || window.innerWidth < 500;
    this.isCollapsed = this.isIconMode;
  }
  
  private handleModeChange() {
    this.updateMode();
    const bg = document.querySelector('.sliding-background') as HTMLElement;
    if (!bg) return;
    bg.classList.remove('animate');
    bg.style.transition = 'none';
    bg.offsetHeight;
    setTimeout(() => {
      bg.style.transition = '';
      this.updateSlidingBackground();
    }, 300);
  }
  
  @HostListener('window:scroll')
  onScroll() {
    const prev = this.isIconMode;
    const now = window.scrollY > 50 || window.innerWidth < 500;
    if (prev !== now) {
      clearTimeout(this.modeChangeTimeout);
      this.modeChangeTimeout = setTimeout(() => this.handleModeChange(), 50);
    }
    this.checkActiveSection();
  }
  
  @HostListener('window:resize')
  onResize() {
    this.handleModeChange();
    this.updateSlidingBackground();
    this.updateIndicatorPosition();
  }
  
  toggleNavbar() {
    if (!this.isIconMode) return;
    this.isCollapsed = !this.isCollapsed;
    setTimeout(() => this.updateSlidingBackground(), 300);
  }
  
  ngOnDestroy() {
    clearTimeout(this.modeChangeTimeout);
  }
}
