import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storageKey = 'theme';
  
  constructor(private storageService: StorageService) {
    this.initializeTheme();
  }

  private async initializeTheme(): Promise<void> {
    const saved = await this.storageService.getItem(this.storageKey);
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = saved || prefers;
    if (theme === 'dark') document.documentElement.classList.add('my-app-dark');
  }

  async toggleDarkMode(): Promise<void> {
    const root = document.documentElement;
    const isDark = root.classList.toggle('my-app-dark');
    await this.storageService.setItem(this.storageKey, isDark ? 'dark' : 'light');
  }
}