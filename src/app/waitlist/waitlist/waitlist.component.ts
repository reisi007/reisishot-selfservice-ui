import {Component, OnInit} from '@angular/core';
import {Observable, timer} from 'rxjs';
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
    this.scrollToAnchorAfterDataIsLoaded();

    this.route.params.subscribe(routeData => {
      this.referrer = routeData['referrer'];
    });
  }

  private scrollToAnchorAfterDataIsLoaded() {
    this.publicItems.subscribe({
      next: () => {
        this.route.fragment.subscribe({
          next: value => {
            if (value !== null) {
              timer(400).subscribe({
                next: () => {
                  document.getElementById(value)
                          ?.scrollIntoView({behavior: 'smooth'});
                },
              });
            }
          },
        });
      },
    });
  }
}
