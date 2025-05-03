import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoggedIn } from '../models/logged-in.model';
import { AppUser } from '../models/app-user.model';
import { map, Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { Member } from '../models/member.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  http = inject(HttpClient);
  private readonly _baseApiUrl: string = 'http://localhost:5000/api/';
  platformId = inject(PLATFORM_ID);

  register(user: AppUser): Observable<LoggedIn> {
    return this.http.post<LoggedIn>(this._baseApiUrl + 'account/register', user);
  }

  login(userInput: Login): Observable<LoggedIn> {
    return this.http.post<LoggedIn>(
      this._baseApiUrl + 'account/login', userInput).pipe(
        map(userResponse => {
          this.setCurrentUser(userResponse);

          return userResponse;
        })
      )
  }

  getAllMember(): Observable<Member[]> {
    return this.http.get<Member[]>(this._baseApiUrl + 'member');
  }

  setCurrentUser(loggedInUser: LoggedIn): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    }
  }
}






/* set current user
  platformId = inject(PLATFORM_ID);
login(userInput: Login): Observable<LoggedIn | null> {
    return this.http.post<LoggedIn>(this._baseApiUrl + 'account/login', userInput).pipe(
      map(userResponse => {
        if (userResponse) {
          this.setCurrentUser(userResponse)
          
          return userResponse;
          }
          
        return null;
      })
    )
          
  }
    setCurrentUser(loggedInUser: LoggedIn): void {
    if (isPlatformBrowser(this.platformId)) {
    console.log(this.platformId);
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
  }
}
*/
