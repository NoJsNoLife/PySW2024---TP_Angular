import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Punto1Component } from './components/punto1/punto1.component';
import { Punto2Component } from './components/punto2/punto2.component';
import { Punto5Component } from './components/punto5/punto5.component';
import { Punto5ticketComponent } from './components/punto5/punto5ticket/punto5ticket.component';
import { Punto5formComponent } from './components/punto5form/punto5form.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'punto1', component: Punto1Component},
    { path: 'punto2', component: Punto2Component},
    {path: 'punto5', component: Punto5Component},
    {path: 'punto5/new', component: Punto5formComponent},
    {path: 'punto5/:dni', component: Punto5ticketComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];
