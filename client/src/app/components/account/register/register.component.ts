import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppUser } from '../../../models/app-user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ExampleService } from '../../../services/example.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule, ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  accountService = inject(AccountService);
  exampleService = inject(ExampleService);
  fB = inject(FormBuilder);

  //#region registerFg 
  registerFg = this.fB.group({
    emailCtrl: ['', [Validators.required, Validators.email]],
    nameCtrl: '',
    passwordCtrl: '',
    confirmPasswordCtrl: '',
    ageCtrl: 0,
    genderCtrl: '',
    cityCtrl: '',
    countryCtrl: ''
  });

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
  //#endregion

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

    let registerResponse$ = this.accountService.register(user);

    registerResponse$.subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err.error)
    });
  }
}