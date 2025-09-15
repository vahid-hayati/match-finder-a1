import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { environment } from '../../../../environments/environment.development';
import { Member } from '../../../models/member.model';
import { LoggedIn } from '../../../models/logged-in.model';
import { MemberService } from '../../../services/member.service';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    MatCardModule, MatTabsModule, CommonModule, PhotoEditorComponent, MatButtonModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit {
  private _platformId = inject(PLATFORM_ID);
  private _memberService = inject(MemberService);

  apiUrl = environment.apiUrl;
  member: Member | undefined;

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    if (isPlatformBrowser(this._platformId)) {
      const loggedInUserStr: string | null = localStorage.getItem('loggedInUser');

      if (loggedInUserStr) {
        const loggedInUser: LoggedIn = JSON.parse(loggedInUserStr);

        this._memberService.getByUserName(loggedInUser.userName).pipe(take(1)).subscribe({
          next: (res) => {
            this.member = res;
          }
        })
      }
    }
  }
}
