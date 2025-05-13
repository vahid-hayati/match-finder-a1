import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Member } from '../../../models/member.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MemberService } from '../../../services/member.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule, MatIconModule
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent {
  memberService = inject(MemberService);
  members: Member[] | undefined;

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    let allMember$: Observable<Member[]> = this.memberService.getAllMembers();

    allMember$.subscribe({
      next: (res) => {
        this.members = res;
      }
    });
  }
}
