import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  isScrolled = false;
  email = 'eliceomoreta@gmail.com';
  emailDialogVisible = false;
  copySuccess = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.pageYOffset;
    const footerElement = document.querySelector('.footer');
    if (footerElement) {
      const footerPosition = footerElement.getBoundingClientRect().top;
      this.isScrolled = footerPosition < window.innerHeight * 0.8;
      footerElement.classList.toggle('scrolled', this.isScrolled);
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.onScroll();
  }

  showEmailDialog() {
    this.emailDialogVisible = true;
  }

  copyEmail(): void {
    navigator.clipboard.writeText(this.email).then(() => {
      this.copySuccess = true;
      setTimeout(() => {
        this.copySuccess = false;
      }, 2000);
    });
  }
}
