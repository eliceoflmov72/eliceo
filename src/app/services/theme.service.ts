import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storageKey = 'theme';
  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = saved || prefers;
    if (theme === 'dark') document.documentElement.classList.add('my-app-dark');
  }

  toggleDarkMode(): void {
    const root = document.documentElement;
    const isDark = root.classList.toggle('my-app-dark');
    localStorage.setItem(this.storageKey, isDark ? 'dark' : 'light');
  }
}