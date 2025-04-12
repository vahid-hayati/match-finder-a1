import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    LoginComponent, RouterOutlet, RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}