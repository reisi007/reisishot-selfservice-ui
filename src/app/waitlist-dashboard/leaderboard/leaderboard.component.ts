import {Component, Input} from '@angular/core';
import {LeaderboardEntry} from '../admin-api/waitlist-admin-api';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent {

  @Input() items!: Array<LeaderboardEntry>;

  constructor() {
  }


}
