import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Userdata, WaitlistItem, WaitlistPerson} from '../api/waitlist-api';
import {WaitlistApiService} from '../api/waitlist-api.service';

@Component({
  selector: 'app-secure-waitlist-area',
  templateUrl: './secure-waitlist-area.component.html',
  styleUrls: ['./secure-waitlist-area.component.scss'],
})
export class SecureWaitlistAreaComponent implements OnInit {
  user!: Userdata;

  items?: Array<WaitlistItem>;

  waitlistPerson?: WaitlistPerson;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: WaitlistApiService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeData => {
      this.user = {
        email: routeData['email'],
        access_key: routeData['access_key'],
      } as Userdata;

      this.apiService.getPrivateItems(this.user).subscribe(
        data => (this.items = data),
        () => this.router.navigate(['waitlist']),
      );

      this.apiService.loadPerson(this.user).subscribe(
        wp => this.waitlistPerson = wp,
      );
    });
  }
}
