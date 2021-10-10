import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router, RouterState} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private titleService: Title) {
  }

  ngOnInit(): void {
    this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          map(() => this.router),
        )
        .subscribe(() => {
          const title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' | ');
          this.titleService.setTitle(title);
        });
  }

  getTitle(state: RouterState, parent: ActivatedRoute | null | undefined): Array<string> {
    const data: Array<string> = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, parent.firstChild?.parent));
    }
    return data;
  }
}
