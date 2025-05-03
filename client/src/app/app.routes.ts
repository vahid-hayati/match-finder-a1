import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/account/register/register.component';
import { LoginComponent } from './components/account/login/login.component';
import { MemberComponent } from './components/member/member.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'account/register', component: RegisterComponent },
    { path: 'account/login', component: LoginComponent },
    { path: 'members', component: MemberComponent },
    { path: 'footer', component: FooterComponent },
    { path: '**', component: NotFoundComponent }
];