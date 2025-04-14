import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoggedIn } from '../models/logged-in.model';
import { AppUser } from '../models/app-user.model';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  http = inject(HttpClient);

  register(user: AppUser): Observable<LoggedIn> {
    return this.http.post<LoggedIn>('http://localhost:5000/api/account/register', user);
  }

  login(userInput: Login): Observable<LoggedIn> {
    return this.http.post<LoggedIn>('http://localhost:5000/api/account/login', userInput);
  }

  getAllMember(): Observable<Member[]> {
    return this.http.get<Member[]>('http://localhost:5000/api/account');
  }
}