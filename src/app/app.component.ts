import {AfterContentInit, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit {


  constructor(
    private router: Router,
    private titleService: Title) {
  }

  ngAfterContentInit(): void {
    const matomo = (window as any)._paq = (window as any)._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    matomo.push(['setCustomUrl', window.location.pathname]);
    matomo.push(['setDocumentTitle', this.titleService.getTitle()]);
    matomo.push(['trackPageView']);
    matomo.push(['enableLinkTracking']);
    const u = 'https://analytics.reisishot.pictures/';
    matomo.push(['setTrackerUrl', u + 'matomo.php']);
    matomo.push(['setSiteId', '7']);
    const g = document.createElement('script');
    const s = document.getElementsByTagName('title')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.src = u + 'matomo.js';
    s.parentNode.insertBefore(g, s);
  }

  ngOnInit(): void {
    this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(() => this.router),
        )
        .subscribe((event) => {
          const title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' | ');
          this.titleService.setTitle(title);
          },
        );


  }

  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}
