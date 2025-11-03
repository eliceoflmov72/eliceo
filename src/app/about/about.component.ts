import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  subtitles: string[] = [];
  currentSubtitle = '';
  isSubtitleChanging = false;
  private subtitleInterval: any;
  private currentIndex = 0;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.loadSubtitles();
    this.currentSubtitle = this.subtitles[0];
    this.startSubtitleRotation();

    // Subscribe to language changes
    this.translate.onLangChange.subscribe(() => {
      this.loadSubtitles();
      this.currentSubtitle = this.subtitles[this.currentIndex];
    });
  }

  ngOnDestroy() {
    if (this.subtitleInterval) {
      clearInterval(this.subtitleInterval);
    }
  }

  private loadSubtitles() {
    this.subtitles = [
      this.translate.instant('about.subtitles.webDeveloper'),
      this.translate.instant('about.subtitles.fullStack'),
      this.translate.instant('about.subtitles.dataAnalyst')
    ];
  }

  private startSubtitleRotation() {
    this.subtitleInterval = setInterval(() => {
      this.isSubtitleChanging = true;
      
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.subtitles.length;
        this.currentSubtitle = this.subtitles[this.currentIndex];
        this.isSubtitleChanging = false;
      }, 500);
    }, 3000);
  }
}
