import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Member } from '../../../models/member.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MemberService } from '../../../services/member.service';
import { Observable } from 'rxjs';
import { MemberCardComponent } from '../member-card/member-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationParams } from '../../../models/helpers/paginationParams.model';
import { PaginatedResult } from '../../../models/helpers/paginatedResult';
import { Pagination } from '../../../models/helpers/pagination';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule, MatIconModule, MemberCardComponent,
    MatPaginatorModule
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent {
  memberService = inject(MemberService);
  members: Member[] | undefined;
  paginationParams: PaginationParams | undefined;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent | undefined;
  pagination: Pagination | undefined;

  ngOnInit(): void {
    this.paginationParams = new PaginationParams();

    this.getAll();
  }

  getAll(): void {
    if (this.paginationParams)
      this.memberService.getAllMembers(this.paginationParams).subscribe({
        next: (response: PaginatedResult<Member[]>) => {
          if (response.body && response.pagination) {
            this.members = response.body;
            this.pagination = response.pagination;
          }
        }
      })
  }

  handlePageEvent(e: PageEvent): void {
    if (this.paginationParams) {
      if (e.pageSize !== this.paginationParams.pageSize)
        e.pageIndex = 0;

      this.pageEvent = e;
      this.paginationParams.pageSize = e.pageSize;
      this.paginationParams.pageNumber = e.pageIndex + 1;

      this.getAll();
    }
  }
}
