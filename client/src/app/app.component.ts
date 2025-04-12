import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AccountService } from './services/account.service';
import { AppUser } from './models/app-user.model';
import { Login } from './models/login.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule, ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /* service */
  accountService = inject(AccountService);
  fB = inject(FormBuilder);

  registerFg = this.fB.group({
    emailCtrl: '',
    nameCtrl: '',
    passwordCtrl: '',
    confirmPasswordCtrl: '',
    ageCtrl: 0,
    genderCtrl: '',
    cityCtrl: '',
    countryCtrl: ''
  })

  get EmailCtrl(): FormControl {
    return this.registerFg.get('emailCtrl') as FormControl;
  }

  get NameCtrl(): FormControl {
    return this.registerFg.get('nameCtrl') as FormControl;
  }

  get PasswordCtrl(): FormControl {
    return this.registerFg.get('passwordCtrl') as FormControl;
  }

  get ConfirmPasswordCtrl(): FormControl {
    return this.registerFg.get('confirmPasswordCtrl') as FormControl;
  }

  get AgeCtrl(): FormControl {
    return this.registerFg.get('ageCtrl') as FormControl;
  }

  get GenderCtrl(): FormControl {
    return this.registerFg.get('genderCtrl') as FormControl;
  }

  get CityCtrl(): FormControl {
    return this.registerFg.get('cityCtrl') as FormControl;
  }

  get CountryCtrl(): FormControl {
    return this.registerFg.get('countryCtrl') as FormControl;
  }

  register(): void {
    let user: AppUser = {
      email: this.EmailCtrl.value,
      name: this.NameCtrl.value,
      password: this.PasswordCtrl.value,
      confirmPassword: this.ConfirmPasswordCtrl.value,
      age: this.AgeCtrl.value,
      gender: this.GenderCtrl.value,
      city: this.CityCtrl.value,
      country: this.CountryCtrl.value
    }

    this.accountService.register(user).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err.error)
    });
  }

  login(): void {
    let userInput: Login = {
      email: 'a1@a.com',
      password: '12345678'
    }

    this.accountService.login(userInput).subscribe();
  }
}