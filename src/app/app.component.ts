import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    TooltipModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eliceo';
  currentLanguage = 'es';

  languages = [
    { code: 'es', name: 'Español', flag: 'flags/spanish.png' },
    { code: 'en', name: 'English', flag: 'flags/english.svg' }
  ];

  constructor(
    private translate: TranslateService,
    private storageService: StorageService
  ) {
    // Set default language
    translate.setDefaultLang('es');
    
    // Initialize language
    this.initializeLanguage();
  }

  private async initializeLanguage(): Promise<void> {
    // Get saved language from storage
    const savedLang = await this.storageService.getItem('language');
    
    if (savedLang) {
      this.currentLanguage = savedLang;
    } else {
      // Get browser language or use default
      const browserLang = this.translate.getBrowserLang();
      const lang = browserLang?.match(/en|es/) ? browserLang : 'es';
      this.currentLanguage = lang;
    }
    
    // Set initial language
    this.translate.use(this.currentLanguage);
  }

  async changeLanguage(langCode: string): Promise<void> {
    if (this.currentLanguage !== langCode) {
      this.currentLanguage = langCode;
      this.translate.use(langCode);
      // Save language to storage
      await this.storageService.setItem('language', langCode);
    }
  }

  getCurrentLanguageFlag(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang ? lang.flag : this.languages[0].flag;
  }

  getLanguageName(langCode: string): string {
    return this.translate.instant(`languages.${langCode}`);
  }
}
