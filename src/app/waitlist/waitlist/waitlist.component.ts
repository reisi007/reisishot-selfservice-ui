import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {WaitlistApiService} from '../api/waitlist-api.service';
import {WaitlistItem} from '../api/waitlist-api';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.scss'],
})
export class WaitlistComponent implements OnInit {
  publicItems!: Observable<Array<WaitlistItem>>;

  referrer?: string;

  constructor(
    private apiService: WaitlistApiService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.publicItems = this.apiService.getPublicItems();

    this.route.params.subscribe(routeData => {
      this.referrer = routeData['referrer'];
    });
  }
}
