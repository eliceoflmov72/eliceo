// info.component.ts
import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  constructor(public translate: TranslateService) {}
}
