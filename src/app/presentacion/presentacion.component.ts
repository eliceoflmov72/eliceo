import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleComponent } from '../shared/title/title.component';

@Component({
  selector: 'app-presentacion',
  standalone: true,
  imports: [RouterLink, TitleComponent],
  templateUrl: './presentacion.component.html',
  styleUrl: './presentacion.component.css'
})
export class PresentacionComponent {
  readonly driveUrl = 'https://drive.google.com/drive/folders/17z7xcpBJ-d-UM7WZ6n1OYv5hXLSafwui?usp=sharing';
  copied = false;

  get qrImageUrl(): string {
    return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(this.driveUrl)}`;
  }

  async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.driveUrl);
      this.setCopied();
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = this.driveUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.setCopied();
    }
  }

  private setCopied(): void {
    this.copied = true;
    window.setTimeout(() => {
      this.copied = false;
    }, 1500);
  }
}
