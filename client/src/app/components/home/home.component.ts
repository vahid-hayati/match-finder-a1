import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Student } from '../../models/student.model';
import { AccountService } from '../../services/account.service';
import { ExampleService } from '../../services/example.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  accountService = inject(AccountService);  
  exampleService = inject(ExampleService); 
  // counterSig = signal<number>(0);
}

/* Set local Storege basic
userName: string = 'Saba';
  
  userIn: string = '';

  student: Student = {
    email: 'parham@a.com',
    name: 'yahya'
  }

  setToLocalStorage(): void {
    // localStorage.setItem('name', 'Parham');
    // localStorage.setItem('name', this.userName);

    localStorage.setItem('student', JSON.stringify(this.student));
  }

  getValueLocalStorage(): void {
    const name = localStorage.getItem('student');

    console.log(name);

    if (name)
      this.userIn = name;
  }

  removeItem(): void {
    localStorage.removeItem('student');
  }
*/