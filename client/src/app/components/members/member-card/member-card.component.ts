import { Component, Input } from '@angular/core';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
@Input('memberInput') memberIn: Member | undefined; // memberInput is a contract
}
