import { Component } from '@angular/core';
import { NavbarComponent } from "../layout/navbar/navbar.component";
import { AboutComponent } from "../about/about.component";
import { TitleComponent } from '../shared/title/title.component';
import { ExperienceComponent } from "../experience/experience.component";
import { StudiesComponent } from "../studies/studies.component";
import { StackComponent } from "../stack/stack.component";
import { ProjectsComponent } from "../projects/projects.component";
import { FooterComponent } from "../layout/footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, AboutComponent, TitleComponent, ExperienceComponent, StudiesComponent, StackComponent, ProjectsComponent, FooterComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
