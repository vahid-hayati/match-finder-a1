import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent}
];
