import { HttpClient } from '@angular/common/http';
import {  inject, Injectable } from '@angular/core';
import { Member } from '../models/member.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  http = inject(HttpClient);

  getAllMembers(): Observable<Member[]> {
    let members$: Observable<Member[]>
      = this.http.get<Member[]>('http://localhost:5000/api/member/get-all');
  
      return members$;
    }
}