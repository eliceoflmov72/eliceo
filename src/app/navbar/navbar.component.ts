import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';


@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  visible: boolean = false;

  constructor(public themeService: ThemeService) { }
}
