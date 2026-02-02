import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Eliceo León' },
  { path: 'info', component: InfoComponent, title: 'Más información' },
  { 
    path: 'zflow', 
    loadComponent: () => import('./zflow/zflow.component').then(m => m.ZFlowComponent),
    title: 'ZFlow Editor' 
  },
  { path: 'not-found', component: NotFoundComponent, title: 'Not Found' },
  { path: '**', redirectTo: 'not-found' }
];
