import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ControlComponent } from './control/control.component';
import { FormsDetailsComponent } from './control/form-detail/form-detail.component';


export const appRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'control', component: ControlComponent},
    { path: 'control/form/:_id', component: FormsDetailsComponent},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];
