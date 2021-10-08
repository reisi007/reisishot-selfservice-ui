import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {WaitlistApiService} from '../api/waitlist-api.service';
import {WaitlistItem} from '../api/waitlist-api';

@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.scss'],
})
export class WaitlistComponent implements OnInit {

  publicItems: Observable<Array<WaitlistItem>>;

  constructor(
    private apiService: WaitlistApiService,
  ) {
  }

  ngOnInit(): void {
    this.publicItems = this.apiService.getPublicItems();
  }


}
