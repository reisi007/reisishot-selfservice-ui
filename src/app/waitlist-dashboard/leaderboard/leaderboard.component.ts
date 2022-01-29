import {Component, Input} from '@angular/core';
import {LeaderboardEntry} from '../admin-api/waitlist-admin-api';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent {

  _items!: Array<LeaderboardEntry>;

  get items(): Array<LeaderboardEntry> {
    return this._items;
  }

  @Input() set items(values: Array<LeaderboardEntry> | undefined) {
    if (values === undefined) {
      return;
    }

    const items = values.map((item, idx) => {
      if (idx !== 0 && values[idx].points === values[idx - 1].points) {
        item.position = values[idx - 1].position;
      }
      else {
        values[idx].position = item.position = idx + 1;
      }
      return item;
    });

    this._items = items;
  }

  _title: string | undefined;

  get title() {
    return this._title || 'Leaderboard';
  }

  @Input()
  set title(value: string) {
    this._title = value;
  }
}
