import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { AccountService } from './services/account.service';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterModule, RouterLink,
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  accountService = inject(AccountService);
  
  ngOnInit(): void { // initialize user on page refresh
    let loggedInUser: string | null  = localStorage.getItem('loggedInUser');
    console.log(loggedInUser);
    
    if (loggedInUser != null)
      this.accountService.setCurrentUser(JSON.parse(loggedInUser))
  }
}
  // accountService = inject(AccountService);
  // platformId = inject(PLATFORM_ID);

  // ngOnInit(): void {
  //   this.initUserOnPageRefresh();
  // }

  // initUserOnPageRefresh(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const loggedInUser = localStorage.getItem('loggedInUser');

  //     if (loggedInUser)
  //       this.accountService.setCurrentUser(JSON.parse(loggedInUser))
  //   }
  // }

/* initialize Page Refresh
accountService = inject(AccountService);
  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.initUserOnPageRefresh();
  }

  initUserOnPageRefresh(): void {
    if (isPlatformBrowser(this.platformId)) {
      const loggedInUser = localStorage.getItem('loggedInUser');

      if (loggedInUser)
        this.accountService.setCurrentUser(JSON.parse(loggedInUser))
    }
  }
*/